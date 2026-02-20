# Implementation Tasks: Todo App Authentication Integration

**Feature Branch**: `3-auth-integration`
**Created**: 2026-01-10
**Status**: Ready for Implementation
**Spec Reference**: `specs/3-auth-integration/spec.md`
**Plan Reference**: `specs/3-auth-integration/plan.md`

---

## Task Overview

| Phase | Frontend Tasks | Backend Tasks | Total |
|-------|----------------|---------------|-------|
| Frontend Auth Setup | 3 | 0 | 3 |
| JWT Handling | 2 | 0 | 2 |
| Backend Verification | 0 | 4 | 4 |
| Route Protection | 1 | 2 | 3 |
| Validation & Security | 1 | 2 | 3 |
| **Total** | **7** | **8** | **15** |

---

## Frontend Auth Setup

### Task FE-001: Configure Better Auth JWT Plugin
**Status**: pending
**Priority**: P1
**User Story**: User Login / User Registration

**Description**: Configure Better Auth client with JWT plugin for token management

**Requirements**:
- Install/verify better-auth with JWT plugin
- Configure JWT signing algorithm (HS256)
- Set token expiration (24 hours)
- Configure cookie settings (HttpOnly, Secure, SameSite=Strict)

**Files to Create/Modify**:
- `frontend/lib/auth/config.ts` (update)
- `frontend/lib/auth/client.ts` (create)
- `frontend/package.json` (verify dependencies)

**Acceptance Criteria**:
- [ ] Better Auth client initializes with JWT configuration
- [ ] Token signed with HS256 algorithm
- [ ] Cookie configured with HttpOnly, Secure, SameSite=Strict
- [ ] Token expiration set to 24 hours

---

### Task FE-002: Create Auth Provider Wrapper
**Status**: pending
**Priority**: P1
**User Story**: User Login / User Registration

**Description**: Create AuthProvider component to wrap the application

**Requirements**:
- Create AuthProvider using Better Auth
- Wrap root layout with AuthProvider
- Provide session context to all components
- Handle initial session restoration

**Files to Create/Modify**:
- `frontend/lib/auth/provider.tsx` (create/update)
- `frontend/app/layout.tsx` (update)

**Acceptance Criteria**:
- [ ] AuthProvider wraps entire application
- [ ] Session state available via useSession hook
- [ ] Session restored on page load
- [ ] No hydration errors

---

### Task FE-003: Create Auth Hooks
**Status**: pending
**Priority**: P1
**User Story**: User Login / User Registration / User Logout

**Description**: Create custom hooks for authentication operations

**Requirements**:
- `useSession()` - Returns current session and loading state
- `useLogin()` - Handles user sign-in
- `useRegister()` - Handles user sign-up
- `useLogout()` - Handles user sign-out

**Files to Create**:
- `frontend/lib/auth/hooks.ts`
- `frontend/hooks/useAuth.ts`

**Acceptance Criteria**:
- [ ] `useSession()` returns session, user, and loading state
- [ ] `useLogin()` triggers sign-in and returns success/error
- [ ] `useRegister()` triggers sign-up and returns success/error
- [ ] `useLogout()` clears session and redirects to login

---

## JWT Handling

### Task FE-004: Configure Axios JWT Interceptor
**Status**: pending
**Priority**: P1
**User Story**: Authenticated API Access

**Description**: Configure Axios to automatically attach JWT token to all requests

**Requirements**:
- Create request interceptor to read token from cookie
- Add Authorization header with Bearer token
- Handle missing/invalid tokens gracefully
- Skip token for auth endpoints (login, register)

**Files to Modify**:
- `frontend/lib/api/client.ts`

**Acceptance Criteria**:
- [ ] Request interceptor extracts jwt_token from cookie
- [ ] Authorization header added with Bearer token format
- [ ] Auth endpoints (login, register) skip token attachment
- [ ] Interceptor handles cookie read errors

---

### Task FE-005: Implement 401 Response Handler
**Status**: pending
**Priority**: P1
**User Story**: Token Expiry Handling

**Description**: Configure Axios response interceptor to handle 401 errors

**Requirements**:
- Detect 401 responses from API
- Clear authentication state on 401
- Redirect to login page with session expired message
- Prevent infinite redirect loops

**Files to Modify**:
- `frontend/lib/api/client.ts`

**Acceptance Criteria**:
- [ ] 401 response triggers logout flow
- [ ] User redirected to /login
- [ ] Message indicates session expired
- [ ] No redirect loops on repeated 401s

---

## Backend Verification

### Task BE-001: Create JWT Verification Utility
**Status**: pending
**Priority**: P1
**User Story**: Backend JWT Verification

**Description**: Create JWT verification utility using PyJWT

**Requirements**:
- Install PyJWT library
- Create decode function for JWT tokens
- Implement signature verification with JWT_SECRET
- Handle expired tokens with specific error
- Extract user_id and email from token payload

**Files to Create**:
- `backend/app/core/jwt.py`

**Acceptance Criteria**:
- [ ] Token decoding returns payload
- [ ] Signature verification fails for tampered tokens
- [ ] Expired tokens raise specific exception
- [ ] user_id and email extracted correctly

---

### Task BE-002: Create Auth Dependency
**Status**: pending
**Priority**: P1
**User Story**: Backend JWT Verification

**Description**: Create FastAPI dependency for JWT verification

**Requirements**:
- Create `verify_jwt` dependency function
- Extract Authorization header from request
- Verify token and extract user identity
- Return User object or raise 401

**Files to Create/Modify**:
- `backend/app/dependencies/auth.py`

**Acceptance Criteria**:
- [ ] Dependency extracts Bearer token from header
- [ ] Invalid tokens return 401 with message
- [ ] Expired tokens return 401 with session expired message
- [ ] Valid tokens return user identity

**Dependencies**:
- Task BE-001 (JWT utility must exist first)

---

### Task BE-003: Create Get Current User Dependency
**Status**: pending
**Priority**: P1
**User Story**: Backend JWT Verification

**Description**: Create dependency to get authenticated user for endpoints

**Requirements**:
- Create `get_current_user` dependency
- Use `verify_jwt` internally
- Return User object with id and email
- Handle authentication errors gracefully

**Files to Modify**:
- `backend/app/dependencies/auth.py`

**Acceptance Criteria**:
- [ ] Dependency returns User object
- [ ] User object contains id and email
- [ ] Unauthenticated requests raise HTTPException 401
- [ ] Works with any endpoint requiring auth

**Dependencies**:
- Task BE-002 (verify_jwt dependency first)

---

### Task BE-004: Update Task Service for User Isolation
**Status**: pending
**Priority**: P1
**User Story**: User Isolation

**Description**: Ensure TaskService uses user_id from JWT for all operations

**Requirements**:
- Modify TaskService methods to accept user_id parameter
- Add user_id filter to all database queries
- Ensure no tasks from other users can be accessed
- Update docstrings to document user isolation

**Files to Modify**:
- `backend/app/services/task_service.py`

**Acceptance Criteria**:
- [ ] All TaskService methods require user_id
- [ ] Database queries filter by user_id
- [ ] User A cannot access User B's tasks
- [ ] Create operation auto-assigns user_id

---

## Route Protection

### Task BE-005: Protect Task Endpoints
**Status**: pending
**Priority**: P1
**User Story**: Authenticated API Access

**Description**: Add authentication dependency to all task endpoints

**Requirements**:
- Add `get_current_user` to GET /tasks endpoint
- Add `get_current_user` to POST /tasks endpoint
- Add `get_current_user` to PUT /tasks/{id} endpoint
- Add `get_current_user` to DELETE /tasks/{id} endpoint
- Add `get_current_user` to POST /tasks/{id}/complete endpoint

**Files to Modify**:
- `backend/app/api/tasks.py`

**Acceptance Criteria**:
- [ ] All task endpoints require valid JWT
- [ ] Requests without token return 401
- [ ] Requests with invalid token return 401
- [ ] user_id from token used for data access

**Dependencies**:
- Task BE-003 (get_current_user dependency)

---

### Task BE-006: Protect Category Endpoints
**Status**: pending
**Priority**: P2
**User Story**: Authenticated API Access

**Description**: Add authentication dependency to category endpoints if they exist

**Requirements**:
- Review existing category endpoints
- Add `get_current_user` to GET /categories
- Add `get_current_user` to POST /categories
- Add user_id filter to category queries

**Files to Modify**:
- `backend/app/api/categories.py` (if exists)

**Acceptance Criteria**:
- [ ] All category endpoints require auth
- [ ] User isolation enforced on categories
- [ ] Users only see their own categories

**Dependencies**:
- Task BE-003 (get_current_user dependency)

---

### Task FE-006: Update Middleware for Auth
**Status**: pending
**Priority**: P1
**User Story**: Protected Route Access

**Description**: Update Next.js middleware for protected route handling

**Requirements**:
- Check session on protected route access
- Redirect unauthenticated users to /login
- Redirect authenticated users away from auth pages
- Preserve redirect destination

**Files to Modify**:
- `frontend/middleware.ts`

**Acceptance Criteria**:
- [ ] /tasks redirects to /login if not authenticated
- [ ] /login redirects to /tasks if authenticated
- [ ] Redirect URL preserved for post-login redirect
- [ ] Middleware runs before page render

---

## Validation & Security

### Task BE-007: Implement Rate Limiting for Auth
**Status**: pending
**Priority**: P2
**User Story**: Security / Brute Force Prevention

**Description**: Implement rate limiting for login and registration endpoints

**Requirements**:
- Install fastapi-limiter or implement Redis-based rate limiting
- Limit login attempts to 5 per minute per IP
- Limit registration attempts to 5 per minute per IP
- Return 429 Too Many Requests when limit exceeded

**Files to Modify**:
- `backend/app/api/auth.py` (or main.py)

**Acceptance Criteria**:
- [ ] Rate limiting active on auth endpoints
- [ ] More than 5 attempts per minute returns 429
- [ ] Normal usage not affected
- [ ] Rate limits reset after timeout

---

### Task BE-008: Add Auth Logging
**Status**: pending
**Priority**: P2
**User Story**: Security / Audit

**Description**: Add logging for authentication events

**Requirements**:
- Log successful logins (user_id, timestamp)
- Log failed login attempts (IP, timestamp, reason)
- Log token verification failures
- Ensure logs don't include sensitive data

**Files to Modify**:
- `backend/app/api/auth.py`
- `backend/app/dependencies/auth.py`

**Acceptance Criteria**:
- [ ] Successful logins logged
- [ ] Failed attempts logged with IP
- [ ] No passwords or tokens in logs
- [ ] Logs format consistent with project standards

---

### Task FE-007: Manual Auth Testing
**Status**: pending
**Priority**: P1
**User Story**: End-to-End Validation

**Description**: Run manual tests to validate complete auth flow

**Requirements**:
- Test login flow with valid credentials
- Test login flow with invalid credentials
- Test logout flow
- Test API access without token
- Test API access with valid token
- Test user isolation (User A cannot see User B tasks)

**Test Actions**:
1. Navigate to /login, enter valid credentials, verify redirect to /tasks
2. Navigate to /login, enter invalid password, verify error message
3. Click logout, verify redirect to /login
4. Use curl/Postman to GET /api/v1/tasks without token, verify 401
5. Use curl/Postman with valid token, verify 200 and tasks returned
6. Login as User A, create task, login as User B, verify task not visible

**Acceptance Criteria**:
- [ ] All 6 test scenarios pass
- [ ] User isolation verified
- [ ] 401 handling works correctly
- [ ] Login/logout flows complete successfully

---

## Dependencies Summary

```
Frontend Tasks:
├── FE-001: Better Auth JWT Plugin Config
├── FE-002: Auth Provider Wrapper
├── FE-003: Auth Hooks
├── FE-004: Axios JWT Interceptor
├── FE-005: 401 Response Handler
├── FE-006: Middleware for Auth
└── FE-007: Manual Auth Testing

Backend Tasks:
├── BE-001: JWT Verification Utility
├── BE-002: Auth Dependency (verify_jwt)
├── BE-003: Get Current User Dependency
├── BE-004: Task Service User Isolation
├── BE-005: Protect Task Endpoints
├── BE-006: Protect Category Endpoints
├── BE-007: Rate Limiting for Auth
└── BE-008: Auth Logging

Dependency Chain:
BE-001 → BE-002 → BE-003 → BE-005 → BE-006
BE-004 (standalone, no auth deps)
```

---

## File Reference

### Frontend Files

| Task | File | Action |
|------|------|--------|
| FE-001 | `frontend/lib/auth/config.ts` | Modify |
| FE-001 | `frontend/lib/auth/client.ts` | Create |
| FE-002 | `frontend/lib/auth/provider.tsx` | Create/Modify |
| FE-003 | `frontend/lib/auth/hooks.ts` | Create |
| FE-003 | `frontend/hooks/useAuth.ts` | Create |
| FE-004 | `frontend/lib/api/client.ts` | Modify |
| FE-005 | `frontend/lib/api/client.ts` | Modify |
| FE-006 | `frontend/middleware.ts` | Modify |
| FE-007 | Manual testing | No files |

### Backend Files

| Task | File | Action |
|------|------|--------|
| BE-001 | `backend/app/core/jwt.py` | Create |
| BE-002 | `backend/app/dependencies/auth.py` | Create |
| BE-003 | `backend/app/dependencies/auth.py` | Modify |
| BE-004 | `backend/app/services/task_service.py` | Modify |
| BE-005 | `backend/app/api/tasks.py` | Modify |
| BE-006 | `backend/app/api/categories.py` | Modify |
| BE-007 | `backend/app/api/auth.py` | Modify |
| BE-008 | `backend/app/api/auth.py` | Modify |
| BE-008 | `backend/app/dependencies/auth.py` | Modify |

---

## Implementation Order

1. **Week 1, Day 1-2**: Frontend Auth Setup (FE-001, FE-002, FE-003)
2. **Week 1, Day 3**: JWT Handling (FE-004, FE-005)
3. **Week 1, Day 4 - Week 2, Day 1**: Backend Verification (BE-001, BE-002, BE-003, BE-004)
4. **Week 2, Day 2-3**: Route Protection (BE-005, BE-006, FE-006)
5. **Week 2, Day 4**: Validation & Security (BE-007, BE-008, FE-007)

---

## Reference Files

- Specification: `specs/3-auth-integration/spec.md`
- Architecture Plan: `specs/3-auth-integration/plan.md`
- Frontend (UI only): `specs/2-frontend-nextjs/`
- Backend (CRUD only): `specs/1-backend-tasks-api/`
