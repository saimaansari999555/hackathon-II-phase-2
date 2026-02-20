---
name: testing.qa.todo
description: Generates comprehensive test coverage for Todo Web App Phase-2 including unit tests, component tests, integration tests, and bug detection covering full CRUD operations and user isolation
---

# Testing & QA Skill

## Instructions

### When to Use
- After new backend endpoints are implemented
- After frontend components are created
- After feature implementation is complete
- When bugs are discovered or suspected
- Before deployment to production
- When validating full CRUD operations
- When testing authentication and user isolation
- For regression testing after changes

### What This Skill Does
Creates comprehensive test coverage including:
1. Backend unit tests for API endpoints
2. Frontend component tests for React components
3. Integration tests covering full user workflows
4. Authentication and authorization tests
5. User isolation verification tests
6. Error handling and edge case tests
7. Bug detection and root cause analysis
8. Test reproduction steps documentation
9. Acceptance test coverage matrix
10. Performance and load testing baseline

### How Claude Should Behave
- Generate testable, executable test cases
- Use appropriate testing frameworks (pytest for backend, Vitest/Jest for frontend)
- Cover happy paths and error scenarios
- Test user isolation thoroughly
- Create realistic test data
- Document test purpose and expected outcomes
- Identify and reproduce bugs systematically
- Provide detailed bug analysis and fixes
- NO test code that doesn't run—all tests executable
- Ensure test coverage targets specification requirements

### Example Usage

```
User: "Generate comprehensive tests for the backend task endpoints"
Claude: Invokes todo-testing-agent → Creates:
  - Unit tests for CRUD operations
  - Integration tests for workflows
  - Authentication tests
  - User isolation tests
  - Error scenario tests
```

## Examples

### Example 1: Backend Endpoint Testing
**Scenario:** Task CRUD endpoints implemented; need comprehensive tests.

**Input:**
```
Generate tests for task endpoints:
- POST /tasks (create)
- GET /tasks (list with filters)
- GET /tasks/{id} (get single)
- PUT /tasks/{id} (update)
- DELETE /tasks/{id} (delete)
- PATCH /tasks/{id}/complete (mark complete)

Test cases:
- Happy path for each endpoint
- Invalid input validation
- Authentication (401 missing token, 401 invalid token)
- Authorization (403 not owner)
- Edge cases (empty filters, pagination bounds)
```

**Process:**
1. Create pytest test file for tasks
2. Setup fixtures for test users and tasks
3. Create tests for each endpoint success case
4. Create tests for validation failures
5. Create tests for auth failures (401)
6. Create tests for ownership failures (403)
7. Create tests for edge cases
8. Run all tests and verify passing

**Output:**
```
backend/tests/
├── test_tasks.py (50+ test cases)
│   ├── test_create_task_success()
│   ├── test_create_task_missing_title()
│   ├── test_create_task_unauthorized()
│   ├── test_create_task_unauthorized_user()
│   ├── test_list_tasks_success()
│   ├── test_list_tasks_filter_by_status()
│   ├── test_list_tasks_pagination()
│   ├── test_get_task_success()
│   ├── test_get_task_not_found()
│   ├── test_get_task_forbidden()
│   ├── test_update_task_success()
│   ├── test_update_task_forbidden()
│   ├── test_delete_task_success()
│   ├── test_delete_task_forbidden()
│   ├── test_complete_task_success()
│   └── ... (more edge cases)

Test Results:
✅ 54 tests passed
✅ 100% endpoint coverage
✅ All auth scenarios tested
✅ All validation tested
```

### Example 2: Frontend Component Testing
**Scenario:** Task management components created; need coverage.

**Input:**
```
Generate tests for frontend components:
- TaskCard (display task info)
- TaskForm (create/edit task)
- TaskList (list with filtering)
- AuthForm (login/register)

Test scenarios:
- Component renders correctly
- User interactions (click, input)
- Props validation
- Form submission
- Error displays
```

**Process:**
1. Create test file for each component
2. Test component rendering with various props
3. Test user interactions
4. Test form validation
5. Test error states
6. Test loading states
7. Mock API calls
8. Run tests

**Output:**
```
frontend/__tests__/
├── TaskCard.test.tsx
├── TaskForm.test.tsx
├── TaskList.test.tsx
└── AuthForm.test.tsx

Examples:
- test("renders task card with data", ...)
- test("calls onEdit when edit button clicked", ...)
- test("displays error message on validation failure", ...)
```

### Example 3: Bug Detection and Analysis
**Scenario:** Users report unexpected behavior.

**Input:**
```
Bug: When user A creates a task, user B can see it in their list.
- Description: Task visibility not respecting user ownership
- Steps to reproduce:
  1. Login as user A
  2. Create task "Buy milk"
  3. Logout
  4. Login as user B
  5. View task list
  6. BUG: See user A's "Buy milk" task
```

**Process:**
1. Understand bug description
2. Create test case that reproduces the bug
3. Analyze code to find root cause
4. Propose fix
5. Create test to verify fix
6. Test fix implementation

**Output:**
```
Bug Analysis:
- Root cause: GET /tasks endpoint missing user_id filter
- Affected code: backend/app/api/tasks.py:get_tasks()
- Fix: Add db.filter(Task.user_id == current_user.id)
- Test: test_user_isolation_list_tasks()
- Status: Fixed and verified
```

### Example 4: Integration Test Suite
**Scenario:** Need to test complete user workflows.

**Input:**
```
Create integration test covering:
1. User registration
2. Login and auth token
3. Create task
4. Update task
5. Complete task
6. Delete task
7. Verify user isolation
```

**Process:**
1. Create integration test file
2. Setup test database/fixtures
3. Test full workflow step by step
4. Verify each response
5. Test with multiple users simultaneously
6. Verify isolation

**Output:**
```
tests/integration/test_user_workflows.py

test_complete_task_workflow():
  1. Register user
  2. Login (verify token)
  3. Create task
  4. Get task (verify ownership)
  5. Update task
  6. Complete task
  7. Delete task
  8. Verify task gone

test_user_isolation():
  1. Create user A
  2. Create user B
  3. User A creates task
  4. Verify user B can't see task
  5. Verify user B can't update task
  6. Verify user B can't delete task
```

### Example 5: Acceptance Test Coverage
**Scenario:** Verify all specification requirements tested.

**Input:**
```
Create acceptance test coverage matrix:
- Map each spec requirement to test case
- Verify all paths covered
- Document test status
```

**Process:**
1. List all specification requirements
2. Map each requirement to one or more tests
3. Mark tests as passing/failing
4. Document coverage percentage
5. Identify gaps

**Output:**
```
Acceptance Test Coverage Matrix:

Requirement: "User can create task with title"
- Test: test_create_task_success ✅ PASS
- Coverage: 100%

Requirement: "Task must have title (required field)"
- Test: test_create_task_missing_title ✅ PASS
- Coverage: 100%

Requirement: "User can only see their own tasks"
- Test: test_user_isolation_list_tasks ✅ PASS
- Test: test_user_isolation_get_task ✅ PASS
- Coverage: 100%

Overall Coverage: 98% (52 of 53 requirements tested)
```

## Acceptance Criteria

- ✅ Unit tests for all backend endpoints created
- ✅ Component tests for all frontend components created
- ✅ Integration tests for full workflows created
- ✅ Happy path tests passing (200/201 responses)
- ✅ Validation error tests passing (400 responses)
- ✅ Authentication tests passing (401 responses)
- ✅ Authorization/ownership tests passing (403 responses)
- ✅ Edge case tests created (empty, null, boundary values)
- ✅ User isolation tests verify data separation
- ✅ All CRUD operations covered by tests
- ✅ Error handling tested (5xx responses)
- ✅ Bugs found are reproducible with test cases
- ✅ Bug fixes verified with passing tests
- ✅ Test coverage >80% of code
- ✅ All tests executable and passing
- ✅ Acceptance test matrix showing spec coverage
- ✅ Regression test suite available
