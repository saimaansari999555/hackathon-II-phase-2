# Architecture Plan: Todo App Authentication Integration

**Feature Branch**: `3-auth-integration`
**Created**: 2026-01-10
**Status**: Draft
**Spec Reference**: `specs/3-auth-integration/spec.md`

---

## 1. High-Level Architecture

### 1.1 System Context

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Todo Full-Stack Application                          │
│                                                                         │
│  ┌──────────────┐                         ┌─────────────────────────┐  │
│  │   Browser    │                         │  FastAPI Backend        │  │
│  │   User       │                         │                         │  │
│  └──────┬───────┘                         │  ┌───────────────────┐  │  │
│         │                                 │  │  JWT Verifier      │  │  │
│         │ HTTPS Requests                  │  │  (Dependency)      │  │  │
│         │ + Authorization Header          │  └─────────┬─────────┘  │  │
│         ▼                                 │            │            │  │
│  ┌──────────────┐                         │  ┌─────────▼─────────┐  │  │
│  │  Next.js     │                         │  │  Task Service     │  │  │
│  │  Frontend    │                         │  │  (user_id filter) │  │  │
│  │              │                         │  └───────────────────┘  │  │
│  │ ┌──────────┐ │                         │                         │  │
│  │ │Better Auth│ │                         │  ┌───────────────────┐  │  │
│  │ │JWT Plugin │ │◄── JWT Token ─────────►│  │  PostgreSQL       │  │  │
│  │ └──────────┘ │   (HttpOnly Cookie)     │  │  (User + Tasks)   │  │  │
│  └──────────────┘                         │  └───────────────────┘  │  │
│                                            └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Auth** | Better Auth + JWT Plugin | Token management, session handling |
| **Token Storage** | HttpOnly Cookies | XSS protection, automatic inclusion |
| **API Client** | Axios with Interceptors | JWT attachment to requests |
| **Backend Auth** | Python JWT (PyJWT) | Token verification |
| **Auth Dependency** | FastAPI Depends | Request-level authentication |

---

## 2. JWT Lifecycle

### 2.1 Token Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           JWT Lifecycle                                   │
└──────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐
  │  User    │ Enters email + password
  └────┬─────┘
       │
       ▼
  ┌─────────────────────────┐
  │  POST /auth/login       │ ──▶ Backend verifies credentials
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  JWT Token Created      │ ◀── Backend signs with JWT_SECRET
  │  - user_id              │     Includes: user_id, exp, iat
  │  - email                │
  │  - exp (24h from now)   │
  │  - iat (issued at)      │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Set-Cookie Header      │ ◀── HttpOnly, Secure, SameSite=Strict
  │  jwt_token=...          │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Browser Cookie Store   │ ◀── Token persists across requests
  └─────────┬───────────────┘
            │
            │ Every API Request
            ▼
  ┌─────────────────────────┐
  │  Authorization Header   │ ◀── Axios interceptor extracts cookie
  │  Bearer <token>         │     Adds to request
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  FastAPI JWT Verifier   │ ◀── Validates signature + expiration
  │  - Verify RS256/HS256   │
  │  - Check expiration     │
  │  - Extract user_id      │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Request Processing     │ ◀── user_id injected into request
  │  - Create Task          │     User isolation enforced
  │  - Get Tasks            │
  │  - etc.                 │
  └─────────────────────────┘
```

### 2.2 Token Details

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| **Algorithm** | HS256 | Symmetric, fast, widely supported |
| **Expiration** | 24 hours | Balance security and UX |
| **Issuer** | Todo App | Token origin identification |
| **Audience** | Todo API | Token scope restriction |

**Token Payload Structure**:
```json
{
  "sub": "user-uuid-here",
  "email": "user@example.com",
  "iat": 1736500000,
  "exp": 1736586400,
  "iss": "todo-app",
  "aud": "todo-api"
}
```

---

## 3. Frontend ↔ Backend Auth Flow

### 3.1 Login Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            Login Flow                                     │
└──────────────────────────────────────────────────────────────────────────┘

  1. User visits /login page
                    │
                    ▼
  2. User enters credentials
     Email: user@example.com
     Password: secret123
                    │
                    ▼
  3. LoginForm submits to Better Auth
     POST /api/v1/auth/login
     Body: { email, password }
                    │
                    ▼
  4. Backend verifies credentials
     - Check email exists
     - Verify password hash
                    │
         ┌──────────┴──────────┐
         │                     │
    Invalid              Valid
    Credentials          Credentials
         │                     │
         ▼                     ▼
  5. Return 401        6. Generate JWT token
     { error }            Sign with JWT_SECRET
         │                 Set cookie: jwt_token=<token>
         │                 Return: { user, session }
         │                     │
         │                     ▼
         │         7. Better Auth stores token
         │            in HttpOnly cookie
         │                     │
         │                     ▼
         │         8. Redirect to /tasks
         │                     │
         │                     ▼
         │         9. Page loads, session restored
         │            from cookie
         │                     │
         │                     ▼
         └─────► 10. Display dashboard
                    with user's tasks
```

### 3.2 API Request Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         API Request Flow                                  │
└──────────────────────────────────────────────────────────────────────────┘

  User clicks "Create Task"
                    │
                    ▼
  TaskForm submits
     POST /api/v1/tasks
                    │
                    ▼
  ┌─────────────────────────────────┐
  │  Axios Request Interceptor      │
  │  - Read jwt_token from cookie   │
  │  - Add Authorization header     │
  │  - Bearer eyJhbGciOi...         │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  HTTPS Request                  │
  │  POST /api/v1/tasks             │
  │  Headers:                       │
  │    Authorization: Bearer <token>│
  │    Content-Type: application/json
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  FastAPI Dependency Chain       │
  │                                 │
  │  get_current_user()             │
  │    │                            │
  │    ▼                            │
  │  verify_jwt_token(token)        │
  │    │                            │
  │    ▼                            │
  │  Decode token                   │
  │  Validate signature             │
  │  Check expiration               │
  │    │                            │
  │    ▼                            │
  │  Return: User = {id, email}     │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  TaskService.create_task()      │
  │  Parameters:                    │
  │    - task_data                  │
  │    - current_user = User        │
  │                                 │
  │  Implementation:                │
  │    task_data["user_id"] =       │
  │      current_user.id            │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  Database Insert                │
  │  INSERT INTO tasks (...)        │
  │  VALUES (..., user_id)          │
  │                                 │
  │  User isolation enforced!       │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  HTTP Response                  │
  │  201 Created                    │
  │  { task: {...} }                │
  └─────────────────────────────────┘
```

### 3.3 Logout Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           Logout Flow                                     │
└──────────────────────────────────────────────────────────────────────────┘

  User clicks "Sign out" button
                    │
                    ▼
  Header calls logout()
     Better Auth signOut()
                    │
                    ▼
  ┌─────────────────────────────────┐
  │  POST /auth/signout             │
  │  (Optional backend call)        │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  Clear HttpOnly Cookie          │
  │  Set-Cookie: jwt_token=;        │
  │  Max-Age=0                      │
  │  Expires=Thu, 01 Jan 1970       │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  Clear frontend session state   │
  │  - Remove from AuthContext      │
  │  - Clear any cached data        │
  └─────────────┬───────────────────┘
                │
                ▼
  ┌─────────────────────────────────┐
  │  Redirect to /login             │
  │  with signed-out state          │
  └─────────────────────────────────┘
```

---

## 4. Environment Variable Strategy

### 4.1 Environment Variables

| Variable | Required | Location | Description |
|----------|----------|----------|-------------|
| `JWT_SECRET` | Yes | Backend | Secret key for signing/verifying JWTs |
| `JWT_ALGORITHM` | No | Backend | Algorithm for JWT (default: HS256) |
| `JWT_EXPIRATION_HOURS` | No | Backend | Token lifetime in hours (default: 24) |
| `NEXT_PUBLIC_API_URL` | Yes | Frontend | Backend API base URL |
| `BETTER_AUTH_URL` | Yes | Frontend | Backend auth endpoint URL |
| `NEXT_PUBLIC_APP_URL` | Yes | Frontend | Frontend URL (for cookies) |

### 4.2 Example Configuration

**.env.local (Frontend)**:
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:8000/api/v1/auth
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Customize token behavior
# BETTER_AUTH_TOKEN_NAME=jwt_token
# BETTER_AUTH_COOKIE_NAME=session
```

**.env (Backend)**:
```bash
# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# API Configuration
API_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
```

### 4.3 Security Considerations

- **JWT_SECRET**: Must be at least 32 characters, random bytes
- **Production**: Use secrets manager (AWS Secrets Manager, etc.)
- **Never commit**: .env files to version control
- **Rotation**: Plan for secret rotation in production

---

## 5. Key Architectural Decisions

### 5.1 Token Storage Method

**Decision**: HttpOnly Cookies

| Option | Pros | Cons |
|--------|------|------|
| **HttpOnly Cookies (chosen)** | XSS protected, automatic inclusion | CSRF vulnerable (mitigated) |
| localStorage | Easy JavaScript access | XSS vulnerable |
| sessionStorage | Session-scoped | XSS vulnerable |

**Rationale**: Security-first approach. HttpOnly prevents XSS from stealing tokens. SameSite=Strict mitigates CSRF. Better Auth handles cookie security.

**Mitigations**:
- SameSite=Strict on cookies
- Secure flag in production (HTTPS only)
- Backend CSRF token validation for state-changing operations

---

### 5.2 JWT Expiration Duration

**Decision**: 24 hours

| Duration | Pros | Cons |
|----------|------|------|
| **24 hours (chosen)** | Balance UX + security | Re-login required daily |
| 1 hour | More secure | Frequent re-authentication |
| 7 days | Better UX | Longer attack window |
| 30 days | Best UX | Security risk |

**Rationale**: 24 hours provides good balance - users don't need to re-login frequently, but exposure window is limited. Session activity can be extended with refresh tokens (future enhancement).

---

### 5.3 Backend Dependency vs Middleware Approach

**Decision**: FastAPI Dependency (Depends) pattern

| Approach | Pros | Cons |
|----------|------|------|
| **Depends (chosen)** | Explicit, testable, per-route control | Boilerplate per endpoint |
| Middleware | Single point, less code | Global, harder to exclude routes |
| Router dependencies | Combines benefits | Slightly more complex |

**Rationale**: Dependency injection provides:
- Explicit auth requirements per endpoint
- Easy testing with mock users
- Fine-grained control (some routes public)
- Clearer code flow

**Implementation Pattern**:
```python
async def get_current_user(token: str = Depends(verify_jwt)) -> User:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return token

@router.get("/tasks")
async def get_tasks(current_user: User = Depends(get_current_user)):
    return await TaskService.get_user_tasks(current_user.id)
```

---

### 5.4 Error Handling for Auth Failures

**Decision**: Centralized error handling with user-friendly messages

| Scenario | HTTP Status | Response Body |
|----------|-------------|---------------|
| Missing token | 401 | { "detail": "Not authenticated" } |
| Invalid token | 401 | { "detail": "Invalid authentication token" } |
| Expired token | 401 | { "detail": "Session expired. Please log in again." } |
| Token verification error | 401 | { "detail": "Authentication failed" } |
| Insufficient permissions | 403 | { "detail": "Permission denied" } |

**Frontend Handling**:
```typescript
// Axios response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state
      // Redirect to login
      // Show session expired message
    }
    return Promise.reject(error);
  }
);
```

---

## 6. Testing Strategy

### 6.1 Test Categories

| Type | Scope | Tools |
|------|-------|-------|
| **Unit Tests** | JWT verification logic | PyTest |
| **Integration Tests** | Auth flow end-to-end | PyTest + requests |
| **Frontend Tests** | Component auth behavior | React Testing Library |
| **Manual Testing** | User journeys | Browser |

### 6.2 Authentication Test Cases

| Test | Input | Expected Output |
|------|-------|-----------------|
| **T1: Access API without token** | GET /api/v1/tasks (no header) | 401 Unauthorized |
| **T2: Access API with invalid token** | GET /api/v1/tasks (invalid Bearer token) | 401 Unauthorized |
| **T3: Access API with malformed token** | GET /api/v1/tasks (Bearer "not-a-jwt") | 401 Unauthorized |
| **T4: Access API with expired token** | GET /api/v1/tasks (expired JWT) | 401 Unauthorized |
| **T5: Access API with valid token** | GET /api/v1/tasks (valid Bearer token) | 200 OK + user's tasks only |
| **T6: User A cannot access User B tasks** | User A token, request User B task | 404 Not Found or empty |

### 6.3 Test Execution

```bash
# Backend tests
cd backend
pytest tests/test_auth.py -v

# Frontend tests
cd frontend
npm test -- --testPathPattern=auth
```

### 6.4 Manual Testing Checklist

| Test | Action | Expected Result |
|------|--------|-----------------|
| Login flow | Enter valid credentials | Redirect to dashboard, token in cookies |
| Logout flow | Click sign out | Redirect to login, cookie cleared |
| Protected route access | Access /tasks without login | Redirect to login |
| API without token | curl /api/v1/tasks | 401 response |
| API with valid token | curl -H "Authorization: Bearer <token>" /api/v1/tasks | 200 + tasks |
| User isolation | User A creates task, User B lists tasks | User B doesn't see User A's task |

---

## 7. Implementation Phases

### Phase 1: Better Auth Configuration (Frontend)
**Duration**: 1 task

- Configure Better Auth client with JWT plugin
- Set up auth provider wrapper
- Create auth hooks (useSession, useLogin, useRegister, useLogout)
- Configure cookie settings (HttpOnly, Secure, SameSite)

**Files Modified/Created**:
- `frontend/lib/auth/config.ts`
- `frontend/lib/auth/provider.tsx`
- `frontend/lib/auth/hooks.ts`

---

### Phase 2: JWT Handling & API Client Updates
**Duration**: 2 tasks

- Update Axios client with request interceptor
- Extract token from cookie, add Authorization header
- Add response interceptor for 401 handling
- Create auth utility functions

**Files Modified/Created**:
- `frontend/lib/api/client.ts` (update interceptors)
- `frontend/context/AuthContext.tsx` (if needed)

---

### Phase 3: FastAPI JWT Verification Logic
**Duration**: 2 tasks

- Create `verify_jwt` dependency function
- Implement token decoding and signature verification
- Handle expired tokens with clear error messages
- Create `get_current_user` dependency

**Files Modified/Created**:
- `backend/app/dependencies/auth.py`
- `backend/app/core/jwt.py`

---

### Phase 4: Route Protection & User Enforcement
**Duration**: 2 tasks

- Apply `get_current_user` dependency to all task endpoints
- Ensure user_id extraction and injection
- Verify user isolation in TaskService
- Update all CRUD endpoints with auth

**Files Modified**:
- `backend/app/api/tasks.py`
- `backend/app/services/task_service.py`

---

### Phase 5: End-to-End Validation
**Duration**: 1 task

- Run all authentication test cases
- Verify user isolation
- Test error handling flows
- Document known limitations

**Deliverables**:
- Test report
- Security review notes
- Ready-for-production checklist

---

## 8. Files Reference

### 8.1 Frontend Files

| File | Purpose |
|------|---------|
| `frontend/lib/auth/config.ts` | Better Auth configuration |
| `frontend/lib/auth/provider.tsx` | AuthProvider wrapper |
| `frontend/lib/auth/hooks.ts` | Auth hooks (useSession, login, logout) |
| `frontend/lib/api/client.ts` | Axios with JWT interceptor |
| `frontend/middleware.ts` | Route protection (already exists) |

### 8.2 Backend Files

| File | Purpose |
|------|---------|
| `backend/app/dependencies/auth.py` | JWT verification dependency |
| `backend/app/core/jwt.py` | JWT utility functions |
| `backend/app/api/tasks.py` | Protected endpoints |
| `backend/app/services/task_service.py` | User isolation logic |

---

## 9. Security Considerations

### 9.1 Token Security

- **Signing**: HS256 with strong secret (32+ characters)
- **Expiration**: 24 hours limits exposure
- **Storage**: HttpOnly cookies prevent XSS theft
- **Transport**: HTTPS only in production

### 9.2 User Isolation

- Every task operation includes `user_id` from token
- Database queries filter by `user_id`
- No cross-user data leakage possible

### 9.3 Error Handling

- No sensitive data in error messages
- Generic "Not authenticated" vs "Invalid token"
- Logging for debugging (not client-facing)

---

## 10. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Login success rate | > 95% | Auth flow tests |
| User isolation violations | 0 | Integration tests |
| 401 error handling | < 2s redirect | UX measurement |
| Auth-related bugs | < 2 in first month | Bug tracking |

---

## 11. References

- Specification: `specs/3-auth-integration/spec.md`
- Frontend: `specs/2-frontend-nextjs/`
- Backend: `specs/1-backend-tasks-api/`
- Constitution: `.specify/memory/constitution.md`
