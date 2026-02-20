---
name: nextjs-frontend-generation-skill
description: Scaffolds and generates complete, production-ready Next.js frontend for Todo Web Application with all pages, components, and API integration in one execution
---

# Next.js Frontend Generation Skill

## Instructions

### When to Use
- Starting fresh frontend development following Phase-2 specifications
- Need a full file structure with all pages, components, and API integration
- Want to ensure strict adherence to specifications without feature improvisation
- After architecture and API contracts are finalized
- When deploying to production requires complete, tested frontend scaffold

### What This Skill Does
Generates a complete, production-ready Next.js frontend including:
1. Full project structure with app router configuration
2. Authentication pages (login, register, password reset)
3. Task management UI (create, read, update, delete, complete)
4. Category management pages
5. Dashboard/home page with task listing and filtering
6. Reusable React components with TypeScript
7. API client configuration with axios/fetch
8. Tailwind CSS styling with responsive design
9. Form validation and error handling
10. JWT token management and storage

### How Claude Should Behave
- Generate entire frontend codebase in ONE execution
- Follow Next.js 14+ app router patterns
- Use TypeScript for type safety
- Apply Tailwind CSS for consistent styling
- Implement proper error boundaries and loading states
- Create reusable, composable components
- Establish clear API integration patterns
- NO partial generation—complete and ready to run
- Test that all pages render without errors

### Example Usage

```
User: "Generate the complete Next.js frontend for our Todo app. Include login, register, and tasks pages with all components."
Claude: Invokes todo-frontend-generator agent → Scaffolds full project with:
  - app/ directory structure
  - Authentication pages
  - Task management pages
  - Reusable components
  - API client setup
  - Tailwind configuration
  - Environment setup
```

## Examples

### Example 1: Fresh Frontend Bootstrap
**Scenario:** Architecture finalized; need complete frontend codebase to start development.

**Input:**
```
Generate complete Next.js frontend for Phase-2 Todo app with:
- User authentication (login/register)
- Task CRUD with filtering and sorting
- Category management
- Task completion tracking
- Responsive mobile-first design
```

**Process:**
1. Create Next.js app structure with TypeScript
2. Generate authentication pages (login, register)
3. Create task management pages (list, create, edit, detail)
4. Build reusable components (TaskCard, TaskForm, CategorySelect)
5. Setup API client with proper error handling
6. Configure Tailwind CSS
7. Add form validation
8. Generate all necessary page layouts

**Output:**
```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── tasks/page.tsx
│   │   ├── tasks/[id]/page.tsx
│   │   ├── categories/page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── client.ts
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── CategorySelect.tsx
│   │   └── ErrorBoundary.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
├── tailwind.config.ts
└── package.json
```

### Example 2: Add New Feature to Generated Frontend
**Scenario:** Frontend generated; need to add task sharing feature.

**Input:**
```
Add task sharing feature to existing Next.js frontend:
- Share task page
- Sharing permissions component
- API integration for share endpoints
```

**Process:**
1. Generate new share pages following existing patterns
2. Create sharing UI components
3. Integrate with existing API client
4. Add proper authentication checks
5. Ensure consistency with existing styling

**Output:** New feature pages and components following existing architecture

## Acceptance Criteria

- ✅ Complete Next.js 14+ project structure generated
- ✅ All pages render without errors
- ✅ Authentication flow implemented (login, register, logout)
- ✅ Task CRUD pages created (list, create, edit, detail)
- ✅ API client properly configured with base URL and error handling
- ✅ TypeScript types defined for all API responses
- ✅ Tailwind CSS applied with responsive design
- ✅ Form validation implemented
- ✅ Error boundaries and loading states present
- ✅ Environment variables properly configured (.env.example provided)
- ✅ JWT token handling in local storage/cookies
- ✅ All pages follow specification exactly
- ✅ Ready to run with `npm install && npm run dev`
- ✅ No hardcoded API URLs or secrets
