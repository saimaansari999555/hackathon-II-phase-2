---
name: database-schema-skill
description: Designs and implements database schema for Todo Web App using Neon PostgreSQL with SQLModel ORM, including tables, relationships, indexes, migrations, and ER diagrams
---

# Database Schema Skill

## Instructions

### When to Use
- Designing initial database layer for todo application
- Modifying schema to add new fields or relationships
- Adding indexes for performance optimization
- Creating migration scripts for schema changes
- Establishing relationships between entities (users, tasks, categories)
- Generating ER diagrams for documentation
- When schema changes are required per specification

### What This Skill Does
Creates complete database schema design including:
1. SQLModel ORM class definitions with all constraints
2. Table structure definitions with proper types and validations
3. Primary and foreign key relationships
4. Unique constraints and indexes
5. Default values and nullable field logic
6. Migration strategy documentation
7. Entity Relationship (ER) diagram descriptions
8. Index recommendations for query performance
9. Data integrity constraints
10. Seed data documentation

### How Claude Should Behave
- Design schema to match specification requirements exactly
- Use PostgreSQL types appropriately (UUID, TIMESTAMP, JSON, etc.)
- Create proper relationships (one-to-many, many-to-many)
- Add indexes for commonly filtered/sorted fields
- Include audit fields (created_at, updated_at, deleted_at)
- Document why each index exists
- Create reusable, extensible schema
- NO application code—only schema definitions and migrations
- Ensure data consistency and referential integrity

### Example Usage

```
User: "Design database schema for todo app with users, tasks, categories, and completions"
Claude: Invokes todo-database-schema agent → Creates:
  - User table with authentication fields
  - Task table with timestamps and status
  - Category table with user relationship
  - Completion tracking table
  - All necessary indexes
  - Migration notes
```

## Examples

### Example 1: Initial Schema Design
**Scenario:** Starting Phase-2 development; need complete schema from specification.

**Input:**
```
Design database schema for Phase-2 Todo app:
- Users (email, password, profile)
- Tasks (title, description, status, priority, due_date, assigned_to_user)
- Categories (name, description, owned_by_user)
- Task completions (track when tasks completed)
- Support filtering tasks by status, category, priority, due date
```

**Process:**
1. Design Users table with auth fields and timestamps
2. Design Tasks table with relationships to Users and Categories
3. Design Categories table with user ownership
4. Design task status as enum (pending, in_progress, completed, archived)
5. Add indexes for common queries (user_id, status, due_date, category_id)
6. Document relationships and constraints
7. Create ER diagram description
8. Document migration strategy

**Output:**
```
# Database Schema

## Tables

### users
- id: UUID (PK)
- email: VARCHAR (UNIQUE, NOT NULL)
- password_hash: VARCHAR (NOT NULL)
- name: VARCHAR
- created_at: TIMESTAMP (DEFAULT now())
- updated_at: TIMESTAMP (DEFAULT now())
- deleted_at: TIMESTAMP (nullable)

### tasks
- id: UUID (PK)
- user_id: UUID (FK → users.id)
- category_id: UUID (FK → categories.id, nullable)
- title: VARCHAR (NOT NULL)
- description: TEXT
- status: ENUM (pending, in_progress, completed, archived)
- priority: ENUM (low, medium, high)
- due_date: DATE (nullable)
- completed_at: TIMESTAMP (nullable)
- created_at: TIMESTAMP (DEFAULT now())
- updated_at: TIMESTAMP (DEFAULT now())

### categories
- id: UUID (PK)
- user_id: UUID (FK → users.id)
- name: VARCHAR (NOT NULL)
- description: TEXT
- created_at: TIMESTAMP (DEFAULT now())
- updated_at: TIMESTAMP (DEFAULT now())

## Indexes
- tasks(user_id) - for filtering by user
- tasks(status) - for dashboard queries
- tasks(due_date) - for sorting and filtering
- tasks(category_id) - for category views
- categories(user_id) - for user's categories
```

### Example 2: Schema Modification
**Scenario:** Need to add task sharing feature.

**Input:**
```
Add to schema:
- Task sharing between users
- Share permissions (view, edit)
- Track who shared the task and when
```

**Process:**
1. Create task_shares junction table
2. Add share_permissions enum (view, edit)
3. Add indexes for share lookups
4. Document new relationships
5. Create migration notes

**Output:** Updated schema with sharing support

### Example 3: Performance Optimization
**Scenario:** Dashboard queries running slow.

**Input:**
```
Analyze schema for performance:
- Add indexes for common dashboard queries
- Optimize task list filtering
- Improve sorting operations
```

**Process:**
1. Identify slow queries from specification
2. Add appropriate indexes
3. Document index rationale
4. Consider composite indexes for multi-field queries
5. Note any schema changes needed

**Output:** Index recommendations and performance analysis

## Acceptance Criteria

- ✅ All entities defined (Users, Tasks, Categories, etc.)
- ✅ SQLModel ORM classes created with all constraints
- ✅ Primary keys defined on all tables
- ✅ Foreign key relationships established correctly
- ✅ Unique constraints applied (email, etc.)
- ✅ Proper data types used (UUID, TIMESTAMP, ENUM, TEXT, etc.)
- ✅ Audit fields present (created_at, updated_at)
- ✅ Soft delete support (deleted_at field)
- ✅ Indexes created for commonly queried/sorted fields
- ✅ Index rationale documented
- ✅ ER diagram description provided (text format)
- ✅ Relationships clearly documented
- ✅ Data integrity constraints specified
- ✅ Migration strategy outlined
- ✅ Ready for use with Alembic or similar tools
- ✅ Compatible with Neon PostgreSQL
