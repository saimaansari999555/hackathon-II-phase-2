# Tasks: Todo Backend Core & Data Integrity

**Input**: Design documents from `/specs/1-backend-tasks-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not requested in specification - tests to be generated via todo-testing-agent after implementation

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend directory structure per plan.md (backend/app/, backend/tests/, backend/alembic/)
- [x] T002 Create backend/requirements.txt with FastAPI, SQLModel, uvicorn, sqlalchemy, pydantic, python-jose, passlib dependencies
- [x] T003 [P] Create .env.example with DATABASE_URL, SECRET_KEY, ALGORITHM, API_HOST, API_PORT, DEBUG variables
- [x] T004 [P] Create backend/.gitignore for Python, environment files, cache, and IDE files

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Configuration and Core

- [x] T005 Create backend/app/config.py with Settings class loading environment variables from .env
- [x] T006 [P] Create backend/app/__init__.py

### Database Infrastructure

- [x] T007 Create backend/app/dependencies/database.py with SQLAlchemy engine, sessionmaker, and get_db dependency
- [x] T008 [P] Create backend/app/core/__init__.py
- [x] T009 Create backend/app/core/exceptions.py with AppException, NotFoundException, UnauthorizedException classes

### Authentication Infrastructure

- [x] T010 Create backend/app/dependencies/auth.py with JWT verification, get_current_user dependency (stub for now)
- [x] T011 [P] Create backend/app/core/security.py with password hashing utilities (for future use)

### Models (Shared Foundation)

- [x] T012 Create backend/app/models/__init__.py
- [x] T013 Create backend/app/models/user.py with User SQLModel (id, email, created_at, relationships)

### Schema Foundation

- [x] T014 Create backend/app/schemas/__init__.py
- [x] T015 [P] Create backend/app/schemas/user_schema.py with UserCreate, UserResponse Pydantic schemas

### API Structure

- [x] T016 Create backend/app/api/__init__.py
- [x] T017 Create backend/app/api/routes.py with APIRouter aggregation for all routes

### Main Application

- [x] T018 Create backend/app/main.py with FastAPI app creation, CORS middleware, route inclusion, OpenAPI docs at /docs
- [x] T019 Create backend/tests/__init__.py
- [x] T020 Create backend/tests/conftest.py with pytest fixtures for test database and app client

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Manage Personal Tasks (Priority: P1) 🎯 MVP

**Goal**: Implement complete task CRUD operations (Create, Read, Update, Delete) with user isolation

**Independent Test**: Can be fully tested by creating a user, authenticating, then performing all CRUD operations on tasks, verifying only the authenticated user's tasks are accessible

**Endpoints**: POST /api/v1/tasks, GET /api/v1/tasks, GET /api/v1/tasks/{task_id}, PUT /api/v1/tasks/{task_id}, DELETE /api/v1/tasks/{task_id}

### Task Model

- [x] T021 [P] [US1] Create backend/app/models/task.py with Task SQLModel (id, user_id, category_id, title, description, status, priority, due_date, completed_at, timestamps, relationships)

### Task Schemas

- [x] T022 [P] [US1] Create backend/app/schemas/task_schema.py with TaskCreate, TaskUpdate, TaskResponse, TaskListResponse Pydantic schemas

### Task Service

- [x] T023 [US1] Create backend/app/services/task_service.py with TaskService class implementing:
  - get_task(task_id, user_id) - with ownership filter
  - list_tasks(user_id, filters) - with ownership filter, pagination
  - create_task(task_data, user_id) - sets user_id automatically
  - update_task(task_id, task_data, user_id) - with ownership filter
  - delete_task(task_id, user_id) - with ownership filter

### Task Endpoints

- [x] T024 [US1] Create backend/app/api/tasks.py with:
  - POST /api/v1/tasks - Create task with user_id from auth
  - GET /api/v1/tasks - List tasks with filters (status, priority, category_id), pagination
  - GET /api/v1/tasks/{task_id} - Get single task with 404 for not found/unauthorized
  - PUT /api/v1/tasks/{task_id} - Update task with ownership check
  - DELETE /api/v1/tasks/{task_id} - Delete task with ownership check

### Route Aggregation

- [x] T025 [US1] Update backend/app/api/routes.py to include tasks router with prefix /api/v1

**Checkpoint**: User Story 1 complete - all task CRUD operations working with user isolation

---

## Phase 4: User Story 2 - Task Organization with Categories (Priority: P2)

**Goal**: Implement category CRUD operations and task-category association

**Independent Test**: Can be fully tested by creating categories, assigning tasks to categories, and filtering tasks by category - all while verifying user isolation

**Endpoints**: POST /api/v1/categories, GET /api/v1/categories, GET /api/v1/categories/{cat_id}, PUT /api/v1/categories/{cat_id}, DELETE /api/v1/categories/{cat_id}

### Category Model

- [ ] T026 [P] [US2] Create backend/app/models/category.py with Category SQLModel (id, user_id, name, description, timestamps, relationships)

### Category Schemas

- [ ] T027 [P] [US2] Create backend/app/schemas/category_schema.py with CategoryCreate, CategoryUpdate, CategoryResponse, CategoryListResponse Pydantic schemas

### Category Service

- [ ] T028 [US2] Create backend/app/services/category_service.py with CategoryService class implementing:
  - get_category(category_id, user_id) - with ownership filter
  - list_categories(user_id) - list all user categories
  - create_category(category_data, user_id) - sets user_id automatically
  - update_category(category_id, category_data, user_id) - with ownership filter
  - delete_category(category_id, user_id) - with ownership filter

### Category Endpoints

- [ ] T029 [US2] Create backend/app/api/categories.py with:
  - POST /api/v1/categories - Create category with user_id from auth
  - GET /api/v1/categories - List all categories for authenticated user
  - GET /api/v1/categories/{category_id} - Get single category with 404 for not found/unauthorized
  - PUT /api/v1/categories/{category_id} - Update category with ownership check
  - DELETE /api/v1/categories/{category_id} - Delete category with ownership check

### Route Aggregation

- [ ] T030 [US2] Update backend/app/api/routes.py to include categories router with prefix /api/v1

### Update Task Schema for Category

- [ ] T031 [US2] Update backend/app/schemas/task_schema.py to include category_name in TaskResponse (read-only, via relationship)

**Checkpoint**: User Story 2 complete - categories working with user isolation and task association

---

## Phase 5: User Story 3 - Task Completion Tracking (Priority: P2)

**Goal**: Implement task completion with status tracking and timestamp

**Independent Test**: Can be fully tested by creating tasks, marking them as complete, verifying status changes, and filtering by completion status

**Endpoints**: POST /api/v1/tasks/{task_id}/complete

### Completion Endpoint

- [ ] T032 [US3] Add POST /api/v1/tasks/{task_id}/complete endpoint in backend/app/api/tasks.py:
  - Updates task status to "completed"
  - Sets completed_at timestamp
  - Validates ownership before completion
  - Returns updated task with 200

### Update Task Service

- [ ] T033 [US3] Update backend/app/services/task_service.py with complete_task(task_id, user_id) method:
  - Validates task ownership
  - Updates status to "completed"
  - Sets completed_at to current timestamp
  - Returns updated task

### Status Filtering

- [ ] T034 [US3] Update GET /api/v1/tasks endpoint in backend/app/api/tasks.py:
  - Support status filter: pending, in_progress, completed, archived
  - Support priority filter: low, medium, high
  - Support due_date sorting

**Checkpoint**: User Story 3 complete - task completion tracking working with filters

---

## Phase 6: User Story 4 - Secure Data Access (Priority: P1)

**Goal**: Ensure proper authentication and user isolation on all endpoints

**Independent Test**: Can be fully tested by creating two different users, performing operations as each user, and verifying that User A cannot read, update, or delete User B's tasks

### Authentication Enforcement

- [ ] T035 [P] [US4] Enhance backend/app/dependencies/auth.py:
  - Implement full JWT token verification
  - Extract user_id from JWT payload
  - Raise HTTPException 401 for missing/invalid tokens
  - Make middleware-compatible for Better Auth integration

### Health Check Endpoint

- [ ] T036 [P] [US4] Create backend/app/api/health.py with GET /health endpoint returning status and database connectivity

### User Service (for user lookup)

- [ ] T037 [US4] Create backend/app/services/user_service.py with get_user_by_id(user_id) method (for validation)

### Update All Endpoints with Auth

- [ ] T038 [US4] Ensure all task endpoints in backend/app/api/tasks.py use get_current_user dependency
- [ ] T039 [US4] Ensure all category endpoints in backend/app/api/categories.py use get_current_user dependency

### Error Handling Consistency

- [ ] T040 [US4] Update backend/app/main.py to register centralized exception handlers for consistent error responses:
  - 400: Validation errors
  - 401: Authentication errors
  - 404: Not found (for both not-owned and non-existent resources)
  - 500: Server errors

**Checkpoint**: User Story 4 complete - all endpoints protected with proper auth and isolation

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] Create backend/alembic/ directory with Alembic migrations setup for database versioning
- [ ] T042 Update backend/app/models/__init__.py to export all models
- [ ] T043 Update backend/app/schemas/__init__.py to export all schemas
- [ ] T044 Update backend/app/services/__init__.py to export all services
- [ ] T045 [P] Create backend/README.md with setup instructions, API documentation overview, and running guide
- [ ] T046 Update backend/app/main.py with proper lifespan handling for database connection lifecycle
- [ ] T047 Add OpenAPI schema customization in backend/app/main.py for better /docs documentation
- [ ] T048 [P] Add logging to all service methods for observability

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) or sequentially in priority order
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories - **MVP**
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on User Story 1 for Task model and TaskResponse schema
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on User Story 1 for Task model
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Can run parallel with other stories but should complete before deployment

### Within Each User Story

- Models before schemas
- Schemas before services
- Services before endpoints
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes:
  - User Story 1 can start immediately (MVP)
  - User Story 2 can start in parallel (depends on US1 Task model)
  - User Story 3 can start in parallel (depends on US1 Task model)
  - User Story 4 can start in parallel (auth is foundational)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different agents

---

## Parallel Execution Examples

### Parallel for Foundational Phase (Phase 2)
```bash
Task: "Create backend/app/config.py with Settings class"
Task: "Create backend/app/core/exceptions.py"
Task: "Create backend/app/models/user.py"
Task: "Create backend/app/schemas/user_schema.py"
Task: "Create backend/app/dependencies/database.py"
```

### Parallel for User Story 1 (Phase 3)
```bash
Task: "Create backend/app/models/task.py"
Task: "Create backend/app/schemas/task_schema.py"
```

### Parallel for User Story 2 (Phase 4)
```bash
Task: "Create backend/app/models/category.py"
Task: "Create backend/app/schemas/category_schema.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Agent Parallel Strategy

With multiple agents:

1. Agent completes Setup + Foundational together
2. Once Foundational is done:
   - Agent 1: User Story 1 (MVP)
   - Agent 2: User Story 2
   - Agent 3: User Story 3
   - Agent 4: User Story 4 (auth)
3. Stories complete and integrate independently

---

## Task Summary

| Category | Count |
|----------|-------|
| Setup (Phase 1) | 4 tasks |
| Foundational (Phase 2) | 16 tasks |
| User Story 1 - CRUD (Phase 3) | 5 tasks |
| User Story 2 - Categories (Phase 4) | 6 tasks |
| User Story 3 - Completion (Phase 5) | 3 tasks |
| User Story 4 - Security (Phase 6) | 6 tasks |
| Polish (Phase 7) | 8 tasks |
| **Total** | **48 tasks** |

### Task Count per User Story

| User Story | Priority | Task Count | Dependencies |
|------------|----------|------------|--------------|
| US1: CRUD Operations | P1 (MVP) | 5 | Foundational |
| US2: Categories | P2 | 6 | Foundational + US1 Task model |
| US3: Completion | P2 | 3 | Foundational + US1 Task model |
| US4: Security | P1 | 6 | Foundational |

### Suggested MVP Scope

**MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1)**

This delivers:
- Complete task CRUD operations
- User isolation enforced
- OpenAPI documentation
- Ready for integration testing

After MVP validated, proceed with:
- Phase 4 (Categories)
- Phase 5 (Completion)
- Phase 6 (Security enhancements)
- Phase 7 (Polish)

---

## Notes

- **[P] tasks** = different files, no dependencies
- **[Story] label** maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
