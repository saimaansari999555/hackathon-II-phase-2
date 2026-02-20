---
name: jwt-auth-verification-skill
description: Implements JWT authentication and authorization for Todo Web App backend including token verification, user isolation on task endpoints, token refresh logic, and authentication failure debugging
---

# JWT Auth Verification Skill

## Instructions

### When to Use
- Implementing initial JWT authentication setup
- Adding authentication middleware to FastAPI
- Protecting API endpoints with token verification
- Enforcing user isolation on task endpoints
- Debugging 401/403 authentication failures
- Integrating Better Auth with JWT token verification
- Handling token expiration and refresh logic
- Setting up token secret rotation

### What This Skill Does
Implements comprehensive JWT authentication including:
1. JWT token generation with user claims
2. Token verification middleware for FastAPI
3. Protected endpoint decorator/dependency injection
4. User extraction from JWT claims
5. User ownership validation on resources
6. Token expiration and refresh handling
7. Secret key management and rotation strategy
8. Error responses (401 Unauthorized, 403 Forbidden)
9. Logging of authentication attempts and failures
10. Integration with Better Auth library

### How Claude Should Behave
- Create production-ready JWT verification code
- Implement proper error handling for invalid/expired tokens
- Enforce user isolation strictly (users can't access others' data)
- Use secure token verification practices
- Never hardcode secrets—use environment variables
- Add comprehensive logging for security events
- Test token validation thoroughly
- Document token expiration and refresh strategy
- NO partial implementations—complete auth flow
- Ensure all protected endpoints validate tokens

### Example Usage

```
User: "Implement JWT authentication and protect the task endpoints"
Claude: Invokes todo-auth-agent → Creates:
  - JWT token generation logic
  - Token verification middleware
  - Protected endpoint decorator
  - User isolation checks
  - Error handling for auth failures
  - Logging infrastructure
```

## Examples

### Example 1: Complete JWT Implementation
**Scenario:** FastAPI app setup; need to add JWT authentication.

**Input:**
```
Implement JWT authentication for backend:
- Generate tokens on login (with user_id and email)
- Add token verification middleware
- Protect all /tasks endpoints
- Enforce user can only access their own tasks
- Handle expired tokens (return 401)
- Return 403 if user tries to access another user's task
```

**Process:**
1. Create JWT utility functions (generate, verify, decode)
2. Create Depends() function for token verification
3. Create middleware or decorator for protected routes
4. Extract user_id from token claims
5. Add ownership checks to task queries
6. Create error responses for auth failures
7. Add logging for all auth events
8. Test with valid and invalid tokens

**Output:**
```
backend/
├── app/
│   ├── security/
│   │   ├── jwt.py (Token generation/verification)
│   │   ├── dependencies.py (Auth dependencies)
│   │   └── models.py (Token models)
│   ├── api/
│   │   ├── auth.py (Login/register endpoints)
│   │   └── tasks.py (Protected task endpoints)
│   ├── middleware/
│   │   └── auth.py (JWT middleware)
│   └── main.py (FastAPI with middleware setup)

# Key implementations:
- def create_access_token(user_id: str) → token string
- def verify_token(token: str) → user_id or raise 401
- async def get_current_user(token: str = Depends(oauth2_scheme)) → User
- @app.get("/tasks") with ownership validation
```

### Example 2: Debug Authentication Failure
**Scenario:** Login works but task endpoint returns 401.

**Input:**
```
Frontend is getting 401 on task API calls. Debug and fix:
- Verify token is being sent in request
- Check token verification logic
- Ensure token hasn't expired
- Verify user_id is extracted correctly
- Add detailed logging
```

**Process:**
1. Add logging to token verification function
2. Check Authorization header parsing
3. Verify token not expired
4. Test token decode with sample token
5. Ensure middleware is applied to endpoint
6. Test with Postman/curl with valid token

**Output:** Fixed authentication with detailed logs showing issue

### Example 3: Enforce User Isolation
**Scenario:** Need to prevent user A from accessing user B's tasks.

**Input:**
```
Add ownership validation to task endpoints:
- Extract user_id from JWT token
- Filter GET /tasks to only return current user's tasks
- Block PUT/DELETE on tasks owned by different user
- Return proper 403 error with logging
```

**Process:**
1. Get current user from JWT token
2. Add to_dict() to filter condition
3. Create function for ownership check
4. Apply check to PUT, DELETE, GET (single)
5. Return 403 with reason
6. Log security event

**Output:** Secure endpoints with user isolation

### Example 4: Token Refresh Strategy
**Scenario:** Need to handle token expiration gracefully.

**Input:**
```
Implement token refresh:
- Short-lived access tokens (15 min)
- Longer-lived refresh tokens (7 days)
- POST /auth/refresh endpoint
- Auto-refresh before expiration (frontend)
```

**Process:**
1. Create refresh token generation
2. Store refresh tokens in database
3. Create /auth/refresh endpoint
4. Validate refresh token before issuing new access token
5. Rotate refresh tokens on use
6. Revoke old refresh tokens

**Output:** Complete token refresh flow

## Acceptance Criteria

- ✅ JWT token generation implemented with user claims
- ✅ Token verification middleware created and applied
- ✅ Protected route decorator/dependency working
- ✅ User ID extracted from token claims
- ✅ User ownership validation on all protected endpoints
- ✅ 401 Unauthorized response for missing/invalid tokens
- ✅ 403 Forbidden response for insufficient permissions
- ✅ Token expiration handled (reject expired tokens)
- ✅ Refresh token strategy documented
- ✅ Secrets stored in environment variables (never hardcoded)
- ✅ Comprehensive logging of auth events
- ✅ Security events logged (failed attempts, token validation)
- ✅ All protected endpoints tested with valid/invalid tokens
- ✅ User isolation enforced (verified with multiple users)
- ✅ Error messages don't leak sensitive information
- ✅ Integration with Better Auth library verified (if applicable)
