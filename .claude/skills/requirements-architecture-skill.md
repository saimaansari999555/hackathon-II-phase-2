---
name: requirements-architecture-skill
description: Analyzes Phase-2 specifications and generates complete architectural foundation with user stories, API contracts, and system design without writing application code
---

# Requirements Architecture Skill

## Instructions

### When to Use
- At project kickoff or when planning a major development phase
- After Phase-2 specifications are finalized
- When transitioning from requirements to implementation planning
- To generate architectural foundation BEFORE coding begins

### What This Skill Does
Reads all Phase-2 specification documents and generates:
1. Complete architectural foundation
2. User stories with acceptance criteria
3. REST API endpoint contracts (request/response shapes)
4. Database schema overview
5. System design and component interactions
6. Implementation roadmap
7. Risk analysis and mitigation strategies

### How Claude Should Behave
- Read ALL specification files first to understand complete scope
- Identify all requirements, constraints, and dependencies
- Generate architecture that is IMPLEMENTATION-READY
- Create contracts (not code) that frontend and backend teams can follow
- Document tradeoffs and design decisions clearly
- NO application code generation—only specification and architecture

### Example Usage

```
User: "Analyze our Phase-2 specs and generate the full architecture plan for the todo app"
Claude: Invokes todo-requirements-architect agent → Reads specs → Generates architecture.md with:
  - User Stories (with acceptance criteria)
  - API Endpoint Contracts
  - Database Schema Design
  - System Architecture Diagram (text)
  - Implementation Phases
  - Risk Mitigation
```

## Examples

### Example 1: Project Kickoff
**Scenario:** Phase-2 specifications are complete; team ready for implementation planning.

**Input:**
```
Analyze Phase-2 requirements and create comprehensive architecture for:
- User authentication and authorization
- Task CRUD operations with filtering
- Category management
- Task completion tracking with timestamps
```

**Process:**
1. Read `specs/phase2/requirements.md`
2. Identify all entities (Users, Tasks, Categories, Completions)
3. Design user stories with acceptance criteria
4. Create REST API contracts for each endpoint
5. Define database schema relationships
6. Document architectural decisions and tradeoffs
7. Output architecture.md with full implementation guidance

**Output:** Architecture document ready for team adoption (no code written)

### Example 2: Mid-Phase Clarification
**Scenario:** Development has started; unclear requirement needs architectural guidance.

**Input:**
```
Clarify the architecture for "task inheritance" feature and document its API contract
```

**Process:**
1. Review existing architecture docs
2. Identify task inheritance requirements
3. Design new API endpoints needed
4. Update schema considerations
5. Document implementation approach for backend/frontend teams

**Output:** Updated architecture with specific guidance (specification only)

## Acceptance Criteria

- ✅ All Phase-2 specifications analyzed
- ✅ User stories generated with clear acceptance criteria
- ✅ REST API contracts defined (method, path, request/response)
- ✅ Database schema documented (entities, relationships, constraints)
- ✅ System design explained (components and interactions)
- ✅ Implementation roadmap provided (phases and dependencies)
- ✅ Risks identified and mitigation strategies defined
- ✅ No application code generated
- ✅ Architecture is implementation-ready for backend and frontend teams
