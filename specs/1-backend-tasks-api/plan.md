# Architecture Plan: Todo Backend Core & Data Integrity

**Feature Branch**: `1-backend-tasks-api`
**Created**: 2026-01-10
**Status**: Draft
**Spec Reference**: `specs/1-backend-tasks-api/spec.md`

---

## 1. High-Level Architecture

### 1.1 System Context

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Todo Backend Service                        │
│                                                                     │
│  ┌──────────────┐    ┌──────────────────────────────────────────┐  │
│  │   Client     │───▶│  FastAPI Application                     │  │
│  │  (Frontend)  │    │                                          │  │
│  └──────────────┘    │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │  Router    │  │  Auth Middleware │   │  │
│                      │  │  Layer     │  │  (JWT Ready)     │   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │  Services  │  │  Error Handler   │   │  │
│                      │  │  Layer     │  │                  │   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │   Models   │  │  Schema Layer    │   │  │
│                      │  │  (SQLModel)│  │  (Pydantic)      │   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌──────────────────────────────────┐   │  │
│                      │  │    SQLModel Engine + Sessions    │   │  │
│                      │  └──────────────────────────────────┘   │  │
│                      │                 │                        │  │
│                      │                 ▼                        │  │
│                      │  ┌──────────────────────────────────┐   │  │
│                      │  │   Neon Serverless PostgreSQL     │   │  │
│                      │  └──────────────────────────────────┘   │  │
│                      └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Request Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          HTTP Request Flow                                │
└──────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐
  │  Client  │  (GET /api/v1/tasks?status=pending)
  └────┬─────┘
       │ HTTP Request + Authorization: Bearer <token>
       ▼
  ┌─────────────────────────┐
  │  FastAPI Route Match    │
  │  @router.get("/tasks")  │  ──▶ Route matched
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Auth Middleware        │  ──▶ Validate JWT token
  │  (Dependency)           │  ──▶ Extract user_id
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Request Validation     │  ──▶ Parse query params
  │  (Pydantic)             │  ──▶ Validate input
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Service Layer          │  ──▶ Build filtered query
  │  (get_user_tasks)       │  ──▶ Apply ownership filter
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Database Query         │  ──▶ SELECT * FROM tasks
  │  (with session)         │  ──▶ WHERE user_id = ? AND status = ?
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Response Serialization │  ──▶ Convert to JSON
  │  (Pydantic)             │  ──▶ Return 200 OK
  └─────────┬───────────────┘
            │
            ▼
  ┌──────────┐
  │  Client  │  (JSON response with tasks array)
  └──────────┘
```

---

## 2. Module and Folder Structure

### 2.1 Backend Directory Layout

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                      # FastAPI application entry point
│   ├── config.py                    # Environment configuration
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py                # Route aggregation
│   │   ├── tasks.py                 # Task CRUD endpoints
│   │   ├── categories.py            # Category CRUD endpoints
│   │   └── health.py                # Health check endpoints
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py                  # User table model
│   │   ├── task.py                  # Task table model
│   │   └── category.py              # Category table model
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── task_schema.py           # Task Pydantic schemas
│   │   ├── category_schema.py       # Category Pydantic schemas
│   │   └── user_schema.py           # User Pydantic schemas
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── task_service.py          # Task business logic
│   │   ├── category_service.py      # Category business logic
│   │   └── user_service.py          # User business logic
│   │
│   ├── dependencies/
│   │   ├── __init__.py
│   │   ├── database.py              # Database session dependency
│   │   └── auth.py                  # JWT verification dependency
│   │
│   └── core/
│       ├── __init__.py
│       ├── exceptions.py            # Custom exceptions
│       └── security.py              # Password hashing (future)
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py                  # Pytest fixtures
│   ├── test_tasks.py                # Task endpoint tests
│   ├── test_categories.py           # Category endpoint tests
│   └── test_auth_isolation.py       # User isolation tests
│
├── alembic/                         # Database migrations
│   ├── versions/
│   └── env.py
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

### 2.2 Key File Purposes

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app creation, middleware setup, route inclusion |
| `config.py` | Environment variable loading, settings singleton |
| `routes.py` | Router aggregation for clean main.py |
| `tasks.py` | Task API endpoints (4 CRUD + list) |
| `categories.py` | Category API endpoints |
| `task_service.py` | Task business logic, query building |
| `database.py` | Engine, session, dependency injection |
| `auth.py` | JWT verification, current_user dependency |
| `task_schema.py` | Request/response Pydantic models |

---

## 3. Database Schema Design

### 3.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           users                                  │
├─────────────────────────────────────────────────────────────────┤
│ id: UUID (PK)                                                   │
│ email: VARCHAR (UNIQUE)                                         │
│ created_at: TIMESTAMP                                           │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ 1:N
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         categories                               │
├─────────────────────────────────────────────────────────────────┤
│ id: UUID (PK)                                                   │
│ user_id: UUID (FK → users.id)                                   │
│ name: VARCHAR (NOT NULL)                                        │
│ description: TEXT                                               │
│ created_at: TIMESTAMP                                           │
│ updated_at: TIMESTAMP                                           │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ 1:N
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                           tasks                                  │
├─────────────────────────────────────────────────────────────────┤
│ id: UUID (PK)                                                   │
│ user_id: UUID (FK → users.id)                                   │
│ category_id: UUID (FK → categories.id, NULLABLE)                │
│ title: VARCHAR (NOT NULL)                                       │
│ description: TEXT                                               │
│ status: ENUM (pending/in_progress/completed/archived)           │
│ priority: ENUM (low/medium/high)                                │
│ due_date: DATE (NULLABLE)                                       │
│ completed_at: TIMESTAMP (NULLABLE)                              │
│ created_at: TIMESTAMP                                           │
│ updated_at: TIMESTAMP                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 SQLModel Definitions

```python
# app/models/user.py
class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    tasks: list["Task"] = Relationship(back_populates="user")
    categories: list["Category"] = Relationship(back_populates="user")

# app/models/category.py
class Category(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    name: str
    description: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="categories")
    tasks: list["Task"] = Relationship(back_populates="category")

# app/models/task.py
class Task(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    category_id: UUID | None = Field(foreign_key="category.id", index=True)
    title: str
    description: str | None = None
    status: TaskStatus = Field(default=TaskStatus.pending)
    priority: TaskPriority = Field(default=TaskPriority.medium)
    due_date: date | None = None
    completed_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="tasks")
    category: Category | None = Relationship(back_populates="tasks")
```

### 3.3 Index Strategy

| Table | Index | Purpose |
|-------|-------|---------|
| tasks | (user_id, status) | Filter tasks by user + status |
| tasks | (user_id, priority) | Filter tasks by user + priority |
| tasks | (user_id, category_id) | Filter tasks by user + category |
| tasks | (user_id, created_at DESC) | Default list ordering |
| categories | (user_id, name) | Unique constraint enforcement |
| users | (email) | Login lookup |

---

## 4. API Contract

### 4.1 URL Structure

**Decision**: Auth-scoped routes (no user_id in URL path)

Rationale:
- Simpler API surface (no /users/{user_id}/tasks)
- Authentication is mandatory; user_id comes from JWT
- Prevents confusion about whose data is being accessed
- Matches modern API patterns (e.g., GitHub, Notion)

```
/api/v1/tasks              # GET (list), POST (create)
/api/v1/tasks/{task_id}    # GET (detail), PUT (update), DELETE
/api/v1/tasks/{task_id}/complete  # POST (mark complete)

/api/v1/categories         # GET (list), POST (create)
/api/v1/categories/{cat_id} # GET (detail), PUT (update), DELETE

/health                     # Health check
/docs                      # OpenAPI documentation
```

### 4.2 Request/Response Schemas

#### Create Task (POST /api/v1/tasks)

**Request**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "category_id": null,
  "due_date": "2026-01-15"
}
```

**Response (201)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "priority": "medium",
  "category_id": null,
  "due_date": "2026-01-15",
  "completed_at": null,
  "created_at": "2026-01-10T10:00:00Z",
  "updated_at": "2026-01-10T10:00:00Z"
}
```

#### List Tasks (GET /api/v1/tasks)

**Query Parameters**:
- `status`: Filter by status
- `priority`: Filter by priority
- `category_id`: Filter by category
- `limit`: Pagination limit (default 20)
- `offset`: Pagination offset (default 0)

**Response (200)**:
```json
{
  "items": [...],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

#### Error Responses

| Status | Scenario | Response |
|--------|----------|----------|
| 400 | Invalid input | `{"detail": "Validation error details"}` |
| 401 | Missing/invalid token | `{"detail": "Not authenticated"}` |
| 404 | Resource not found | `{"detail": "Resource not found"}` |
| 500 | Server error | `{"detail": "Internal server error"}` |

---

## 5. Ownership Enforcement Strategy

### 5.1 Database-Level Enforcement

**Pattern**: Always filter by user_id in queries

```python
# DO: Always filter by user_id
def get_task(session: Session, task_id: UUID, user_id: UUID) -> Task | None:
    return session.exec(
        select(Task).where(
            Task.id == task_id,
            Task.user_id == user_id  # Critical: ownership filter
        )
    ).first()

# DON'T: Query without user_id
def get_task_unsafe(session: Session, task_id: UUID) -> Task | None:
    return session.get(Task, task_id)  # BUG: No ownership check!
```

### 5.2 Service Layer Pattern

```python
class TaskService:
    def __init__(self, session: Session, current_user_id: UUID):
        self.session = session
        self.user_id = current_user_id

    def get_task(self, task_id: UUID) -> Task | None:
        """Get task with automatic ownership enforcement."""
        return self.session.exec(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == self.user_id
            )
        ).first()

    def list_tasks(self, filters: TaskFilters) -> list[Task]:
        """List tasks with automatic ownership enforcement."""
        query = select(Task).where(Task.user_id == self.user_id)

        if filters.status:
            query = query.where(Task.status == filters.status)
        if filters.priority:
            query = query.where(Task.priority == filters.priority)
        if filters.category_id:
            query = query.where(Task.category_id == filters.category_id)

        query = query.offset(filters.offset).limit(filters.limit)
        return self.session.exec(query).all()
```

### 5.3 Error Handling for Ownership Violations

**Decision**: Return 404 (not 403) for unauthorized access attempts

Rationale:
- Prevents ID enumeration attacks
- Doesn't reveal whether a resource exists
- Consistent behavior for owned vs. non-owned non-existent resources

```python
def get_task_or_404(task_id: UUID, user_id: UUID) -> Task:
    task = task_service.get_task(task_id, user_id)
    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )
    return task
```

---

## 6. Key Architectural Decisions

### 6.1 Task Ownership Model

**Decision**: Store user_id directly in tasks table

| Alternative | Tradeoff |
|-------------|----------|
| Shared tasks table with ownership table | More complex joins, slower queries |
| Separate table per user | Schema management nightmare |
| User_id in tasks table (chosen) | Simple, fast queries, clear ownership |

### 6.2 SQLModel vs Alternative ORMs

**Decision**: Use SQLModel

| ORM | Pros | Cons |
|-----|------|------|
| SQLAlchemy Core | Mature, flexible | Verbose, complex |
| SQLModel (chosen) | Type-safe, Pydantic integration, clean | Newer, less community examples |
| Tortoise ORM | Async native | Different patterns |
| Prisma-like (psycopg) | Type-safe | Not Python-native |

**Rationale**: SQLModel provides:
- Seamless Pydantic integration for request/response
- Type hints throughout
- Clean SQLModel syntax
- Active development by Pydantic creator

### 6.3 Database Connection Lifecycle

**Decision**: Session per request (scoped session pattern)

```python
# dependencies/database.py
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Session = scoped_session(SessionLocal)

def get_db() -> Generator:
    """Dependency that provides a database session."""
    db = Session()
    try:
        yield db
    finally:
        db.close()
```

**Rationale**:
- Thread-safe per-request isolation
- Automatic cleanup on request end
- Supports async with proper configuration
- Standard FastAPI pattern

### 6.4 Error Handling Strategy

**Decision**: Centralized exception handlers with consistent response shapes

```python
# core/exceptions.py
class AppException(Exception):
    status_code: int
    detail: str

class NotFoundException(AppException):
    status_code = 404
    detail = "Resource not found"

class UnauthorizedException(AppException):
    status_code = 401
    detail = "Not authenticated"

class ForbiddenException(AppException):
    status_code = 403
    detail = "Access denied"

# main.py exception handlers
@app.exception_handler(NotFoundException)
async def not_found_handler(request, exc):
    return JSONResponse(status_code=404, content={"detail": exc.detail})
```

### 6.5 JWT Middleware Readiness

**Decision**: Dependency injection pattern, no hard coupling

```python
# dependencies/auth.py
def get_current_user(token: str = Depends(JWT_SCHEME)) -> UUID:
    """Verify JWT and return user_id. Ready for any JWT provider."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: UUID = UUID(payload["sub"])
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )
```

**Rationale**:
- Works with any JWT provider (Better Auth, Auth0, custom)
- Easy to swap JWT validation logic
- Clear interface for authentication
- Middleware-agnostic design

---

## 7. Testing Strategy

### 7.1 Test Categories

| Category | Purpose | Tools |
|----------|---------|-------|
| Unit Tests | Test individual service functions | pytest, pytest-asyncio |
| Integration Tests | Test API endpoints with real DB | TestClient, test database |
| Isolation Tests | Verify user ownership enforcement | Multiple authenticated clients |
| Contract Tests | Validate OpenAPI schema | Schemathesis |

### 7.2 Test Scenarios

#### CRUD Operations Tests

| Endpoint | Test Cases |
|----------|------------|
| POST /tasks | Create with valid data, Create with missing title, Create with invalid category |
| GET /tasks | List all, Filter by status, Filter by priority, Pagination |
| GET /tasks/{id} | Get owned task, Get non-existent task |
| PUT /tasks/{id} | Update owned task, Update non-existent task |
| DELETE /tasks/{id} | Delete owned task, Delete non-existent task |

#### User Isolation Tests

```python
async def test_user_isolation_create(user_a_token, user_b_token):
    """User A creates task; User B cannot access it."""
    # User A creates task
    task = await user_a_client.post("/tasks", json={"title": "A's task"})
    task_id = task.json()["id"]

    # User B cannot see User A's task
    response = user_b_client.get(f"/tasks/{task_id}")
    assert response.status_code == 404  # Not 403 (ID enumeration prevention)

    # User B cannot update User A's task
    response = user_b_client.put(f"/tasks/{task_id}", json={"title": "Hacked"})
    assert response.status_code == 404

    # User B cannot delete User A's task
    response = user_b_client.delete(f"/tasks/{task_id}")
    assert response.status_code == 404
```

#### Authentication Tests

```python
async def test_authentication_required():
    """Unauthenticated requests return 401."""
    response = unauthenticated_client.get("/tasks")
    assert response.status_code == 401

async def test_invalid_token():
    """Invalid JWT token returns 401."""
    response = client.get(
        "/tasks",
        headers={"Authorization": "Bearer invalid-token"}
    )
    assert response.status_code == 401
```

### 7.3 Test Database Strategy

```python
# tests/conftest.py
@pytest.fixture(scope="session")
def postgres_container():
    """Spin up test PostgreSQL container."""
    # Use testcontainers or pytest-docker
    pass

@pytest.fixture
def test_db(postgres_container):
    """Create test database with migrations."""
    engine = create_test_connection()
    Base.metadata.create_all(engine)
    yield engine
    Base.metadata.drop_all(engine)

@pytest.fixture
async def user_a_client(test_db):
    """Client authenticated as User A."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        token = create_test_token(user_id=uuid4())
        client.headers["Authorization"] = f"Bearer {token}"
        yield client
```

---

## 8. Implementation Stages

### Stage 1: Architecture Definition (Complete)
- [x] Define folder structure
- [x] Design database schema
- [x] Plan API contracts
- [x] Document ownership enforcement

### Stage 2: Database Schema Implementation
- [ ] Create SQLModel models
- [ ] Set up Alembic migrations
- [ ] Create database connection utilities
- [ ] Write model unit tests

### Stage 3: API Contract Implementation
- [ ] Create Pydantic schemas
- [ ] Implement route handlers
- [ ] Add request validation
- [ ] Create OpenAPI documentation

### Stage 4: Ownership and Access Enforcement
- [ ] Implement auth dependency
- [ ] Add ownership filters to all queries
- [ ] Create consistent error responses
- [ ] Write isolation tests

### Stage 5: Validation and Refinement
- [ ] Run full test suite
- [ ] Verify OpenAPI schema
- [ ] Performance testing
- [ ] Documentation review

---

## 9. Configuration

### 9.1 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | Neon PostgreSQL connection string |
| SECRET_KEY | Yes | JWT signing secret |
| ALGORITHM | No | JWT algorithm (default: HS256) |
| ACCESS_TOKEN_EXPIRE_MINUTES | No | Token expiration (default: 30) |
| API_HOST | No | Host to bind (default: 0.0.0.0) |
| API_PORT | No | Port to bind (default: 8000) |
| DEBUG | No | Debug mode (default: false) |

### 9.2 Example .env

```bash
DATABASE_URL=postgresql://user:pass@ep-xxx.region.neon.tech/dbname?sslmode=require
SECRET_KEY=your-jwt-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=false
```

---

## 10. Open Questions & Clarifications

No clarifications needed - specification is complete and implementation-ready.

---

## 11. References

- Specification: `specs/1-backend-tasks-api/spec.md`
- Constitution: `.specify/memory/constitution.md`
- Skills: `skills/fastapi-backend-crud-skill.md`
- Database Schema Skill: `skills/database-schema-skill.md`
