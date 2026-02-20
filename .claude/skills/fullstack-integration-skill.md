---
name: fullstack-integration-skill
description: Connects and integrates all components of Todo Full-Stack application into cohesive, working system with authentication flows, CORS, environment variables, and end-to-end testing
---

# Full-Stack Integration Skill

## Instructions

### When to Use
- After frontend pages and backend API endpoints have been implemented separately
- When frontend and backend need to communicate with each other
- Configuring authentication flows (JWT token attachment to requests)
- Setting up CORS policies between frontend and backend
- Establishing environment variables for API communication
- Performing end-to-end testing of user workflows
- Resolving inconsistencies or contract mismatches between frontend and backend
- Preparing application for local development with all systems functioning

### What This Skill Does
Integrates all components into a working full-stack application:
1. Connect frontend API client to backend endpoints
2. Configure JWT token attachment to all API requests
3. Setup CORS policies allowing frontend to access backend
4. Environment variable configuration (.env files)
5. Authentication flow testing (login → access tasks → logout)
6. End-to-end workflow testing (create → read → update → delete → complete)
7. Error handling consistency across frontend and backend
8. Response format validation
9. Contract verification between frontend and backend
10. Local development startup scripts and documentation

### How Claude Should Behave
- Verify all API contracts match between frontend and backend
- Test complete user workflows end-to-end
- Ensure JWT tokens properly attached to requests
- Validate CORS configuration allows all necessary operations
- Check error handling is consistent
- Test with real API requests, not mocks
- Document integration requirements clearly
- Provide troubleshooting guide for common issues
- NO new feature development—only integration
- Create startup scripts for easy local development

### Example Usage

```
User: "Wire everything together and test the full user flow"
Claude: Invokes todo-integration-agent → Tests:
  - Frontend can reach backend API
  - Authentication flow works end-to-end
  - JWT tokens attached to requests
  - CORS allows frontend requests
  - All CRUD operations work
  - Error handling matches spec
```

## Examples

### Example 1: Initial Full-Stack Integration
**Scenario:** Frontend and backend implemented separately; need to wire together.

**Input:**
```
Integrate frontend and backend:
- Frontend running on http://localhost:3000
- Backend running on http://localhost:8000
- Configure API client to call backend
- Setup JWT token handling
- Test complete user workflows
```

**Process:**
1. Update frontend API client with backend base URL
2. Configure CORS on backend to allow localhost:3000
3. Setup JWT token storage in frontend (localStorage or cookie)
4. Add token to Authorization header on all requests
5. Test login flow (POST /auth/login)
6. Test task creation (POST /tasks)
7. Test task listing with auth (GET /tasks)
8. Test task update (PUT /tasks/{id})
9. Test task delete (DELETE /tasks/{id})
10. Test error scenarios (invalid token, 404, etc.)

**Output:**
```
Integration checklist:
✅ Frontend API client configured
✅ Backend CORS enabled
✅ JWT token stored and attached
✅ Login/register flow working
✅ Task CRUD operations working
✅ Error handling consistent
✅ All workflows tested
✅ Environment variables configured
```

### Example 2: Resolve Integration Issues
**Scenario:** Frontend requests failing with CORS or auth errors.

**Input:**
```
Frontend requests failing:
- GET /tasks returns 401 Unauthorized
- POST /tasks returns CORS error
- Token not being sent to backend
```

**Process:**
1. Check frontend API client Authorization header
2. Verify token stored in localStorage
3. Debug CORS headers from backend
4. Test with curl to verify backend working
5. Trace request in browser DevTools
6. Fix token attachment logic
7. Verify CORS headers on backend
8. Re-test integration

**Output:** Working integration with root causes documented

### Example 3: Contract Validation
**Scenario:** Frontend and backend have mismatched API contracts.

**Input:**
```
Validate API contracts:
- Frontend expects task.dueDate, backend returns task.due_date
- Frontend sends priority as number, backend expects string
- Response includes extra fields backend doesn't expect
```

**Process:**
1. Compare frontend request format with backend expectations
2. Compare backend response format with frontend expectations
3. List all mismatches
4. Decide on canonical format (follow spec)
5. Update frontend or backend to match
6. Re-test integration

**Output:** Documented contract changes and updated code

### Example 4: End-to-End Workflow Testing
**Scenario:** Need to verify complete user journey works.

**Input:**
```
Test complete workflow:
1. New user registration
2. Login and get auth token
3. Create new task with category
4. List tasks with filters
5. Update task priority
6. Mark task as complete
7. Delete task
8. Logout
```

**Process:**
1. Execute each step in order
2. Capture response at each step
3. Verify HTTP status codes (200, 201, 204, etc.)
4. Verify response data format
5. Verify JWT token valid after login
6. Verify subsequent requests include token
7. Verify ownership isolation (user B can't see user A's tasks)
8. Document any issues found

**Output:**
```
End-to-End Test Report:
✅ Registration: POST /auth/register → 201
✅ Login: POST /auth/login → 200 (token received)
✅ Create Task: POST /tasks → 201
✅ List Tasks: GET /tasks → 200 (with filters)
✅ Update Task: PUT /tasks/123 → 200
✅ Complete Task: PATCH /tasks/123/complete → 200
✅ Delete Task: DELETE /tasks/123 → 204
✅ Logout: POST /auth/logout → 200
```

### Example 5: Local Development Setup
**Scenario:** Team members need to run full stack locally.

**Input:**
```
Create startup guide and scripts:
- How to install dependencies
- How to start frontend and backend
- Environment variable setup
- Database setup (if needed)
- Troubleshooting common issues
```

**Process:**
1. Document dependency installation steps
2. Create .env.example files
3. Create startup scripts or Makefile
4. Document port numbers and URLs
5. Create troubleshooting guide
6. Test all instructions work

**Output:**
```
DEVELOPMENT.md with:
- Prerequisites (Node, Python, PostgreSQL)
- Installation steps
- Environment setup
- Startup commands
- Testing commands
- Troubleshooting section
- Example requests (curl or Postman)
```

## Acceptance Criteria

- ✅ Frontend API client configured with backend base URL
- ✅ Backend CORS enabled for frontend domain
- ✅ JWT tokens properly stored in frontend
- ✅ Authorization header attached to all protected requests
- ✅ Authentication flow tested end-to-end (login → access → logout)
- ✅ All CRUD operations tested (create, read, update, delete)
- ✅ Task completion flow working
- ✅ User isolation enforced (verified with multiple users)
- ✅ Error handling consistent between frontend and backend
- ✅ Response formats match between frontend expectations and backend
- ✅ All API contracts verified against specification
- ✅ Status codes correct (200, 201, 204, 400, 401, 403, 404, 500)
- ✅ Environment variables properly configured
- ✅ No hardcoded URLs or secrets in frontend
- ✅ Complete workflow tested and documented
- ✅ Local development startup guide created
- ✅ Troubleshooting guide provided
- ✅ Ready for team development
