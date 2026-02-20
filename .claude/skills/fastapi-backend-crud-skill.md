---
name: fastapi-backend-crud-skill
description: Implements FastAPI CRUD endpoints for tasks and users with SQLModel database models, JWT authentication, error handling, and logging for Phase-2 Todo Web Application
---

# FastAPI Backend CRUD Skill

## Instructions

### When to Use
- Building FastAPI CRUD endpoints for tasks and users
- After database schema is finalized
- When implementing task management features (create, read, update, delete, complete)
- Adding user ownership validation to endpoints
- Setting up error handling and logging infrastructure
- Implementing task filtering, pagination, and sorting

### What This Skill Does
Implements production-ready FastAPI backend including:
1. SQLModel ORM models for Users and Tasks
2. Complete CRUD endpoints (POST, GET, PUT, DELETE)
3. JWT-based authentication middleware
4. User ownership validation on task endpoints
5. Task completion tracking with timestamps
6. Filtering, pagination, and sorting functionality
7. Comprehensive error handling with proper HTTP status codes
8. Request validation with Pydantic models
9. Logging infrastructure for debugging and monitoring
10. Database migrations setup

### How Claude Should Behave
- Generate complete, testable endpoint implementations
- Implement proper JWT validation on protected routes
- Enforce user isolation (users can only access their own tasks)
- Use SQLModel for type-safe ORM queries
- Include comprehensive error handling
- Add logging at critical points
- Follow REST API conventions strictly
- NO partial implementations—complete and ready to test
- Ensure all endpoints match API contracts from architecture

### Example Usage

```
User: "Implement the CRUD endpoints for tasks with user ownership validation"
Claude: Invokes todo-backend-agent → Creates:
  - Task and User SQLModel classes
  - POST /tasks endpoint
  - GET /tasks and GET /tasks/{id} endpoints
  - PUT /tasks/{id} endpoint
  - DELETE /tasks/{id} endpoint
  - JWT validation middleware
  - Ownership checks on all endpoints
```

## Examples

### Example 1: Complete Task CRUD Implementation
**Scenario:** Database schema finalized; need to implement all task endpoints.

**Input:**
```
Implement complete CRUD for tasks with:
- User ownership validation on all endpoints
- Task filtering by status and category
- Pagination (limit, offset)
- Timestamp tracking for created/updated/completed
- Proper error handling and logging
```

**Process:**
1. Create Task SQLModel with all required fields
2. Create User SQLModel with auth fields
3. Implement POST /tasks (create with user_id)
4. Implement GET /tasks (list with filters, pagination)
5. Implement GET /tasks/{id} (single task)
6. Implement PUT /tasks/{id} (update with ownership check)
7. Implement DELETE /tasks/{id} (delete with ownership check)
8. Implement PATCH /tasks/{id}/complete (mark complete)
9. Add JWT middleware to validate tokens
10. Add error handling for all endpoints

**Output:**
```
backend/
├── app/
│   ├── models/
│   │   ├── user.py (User SQLModel)
│   │   └── task.py (Task SQLModel)
│   ├── schemas/
│   │   ├── task_schema.py (Pydantic models)
│   │   └── user_schema.py (Pydantic models)
│   ├── api/
│   │   ├── tasks.py (Task endpoints)
│   │   ├── users.py (User endpoints)
│   │   └── auth.py (Auth endpoints)
│   ├── middleware/
│   │   └── auth.py (JWT validation)
│   ├── services/
│   │   ├── task_service.py (Business logic)
│   │   └── user_service.py (Business logic)
│   ├── dependencies.py (JWT validation helpers)
│   ├── main.py (FastAPI app setup)
│   └── config.py (Environment config)
```

### Example 2: Add Ownership Validation
**Scenario:** Basic endpoints exist; need to add user isolation.

**Input:**
```
Add user ownership validation to task endpoints:
- Verify JWT token contains user_id
- Check task.user_id matches request user
- Return 403 if user doesn't own task
- Add logging for access attempts
```

**Process:**
1. Create JWT dependency that validates and extracts user_id
2. Update GET, PUT, DELETE endpoints to include ownership check
3. Add error response for 403 Forbidden
4. Add logging for security events
5. Test with multiple users

**Output:** Updated endpoints with security validation

### Example 3: Task Filtering and Pagination
**Scenario:** Basic list endpoint exists; need advanced filtering.

**Input:**
```
Add to GET /tasks endpoint:
- Filter by status (pending, completed, archived)
- Filter by category_id
- Filter by due_date range
- Pagination (limit, offset)
- Sorting (by created_at, due_date, status)
```

**Process:**
1. Add query parameters to endpoint signature
2. Build dynamic SQLAlchemy query with filters
3. Apply sorting
4. Add pagination
5. Return paginated response with total count

**Output:** Enhanced list endpoint ready for filtering UI

## Acceptance Criteria

- ✅ All CRUD endpoints implemented (POST, GET, PUT, DELETE, PATCH)
- ✅ SQLModel ORM classes created for all entities
- ✅ JWT authentication implemented on all protected endpoints
- ✅ User ownership validation enforced on task endpoints
- ✅ Proper HTTP status codes returned (200, 201, 400, 401, 403, 404, 500)
- ✅ Request/response validation using Pydantic schemas
- ✅ Filtering, pagination, sorting implemented
- ✅ Timestamps tracked (created_at, updated_at, completed_at)
- ✅ Comprehensive error handling with meaningful messages
- ✅ Logging added at critical points
- ✅ All endpoints tested and working
- ✅ API endpoints match architecture contracts exactly
- ✅ Database transactions handled properly
- ✅ Ready to integrate with frontend
