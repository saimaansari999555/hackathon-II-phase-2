# Implementation Tasks: Todo Frontend with Authentication

**Feature Branch**: `2-frontend-nextjs`
**Created**: 2026-01-10
**Status**: Ready for Implementation
**Spec Reference**: `specs/2-frontend-nextjs/spec.md`
**Plan Reference**: `specs/2-frontend-nextjs/plan.md`

---

## Phase 1: Project Setup & Config

### Task 1.1: Initialize Next.js Project
**Status**: pending
**Priority**: P1
**User Story**: Infrastructure

**Description**: Initialize a new Next.js 16+ project with TypeScript and Tailwind CSS

**Requirements**:
- Create Next.js app with App Router
- Configure TypeScript with strict mode
- Set up Tailwind CSS
- Configure directory structure per plan

**Files to Create**:
- `frontend/package.json`
- `frontend/tsconfig.json`
- `frontend/next.config.js`
- `frontend/tailwind.config.ts`

**Acceptance Criteria**:
- [ ] Next.js project runs successfully (`npm run dev`)
- [ ] TypeScript compilation passes with no errors
- [ ] Tailwind CSS styles apply correctly
- [ ] Project structure matches plan architecture

---

### Task 1.2: Configure Environment Variables
**Status**: pending
**Priority**: P1
**User Story**: Infrastructure

**Description**: Set up environment configuration for API URLs and app settings

**Requirements**:
- Create `.env.local.example`
- Define all required environment variables
- Configure type safety for environment variables

**Files to Create**:
- `frontend/.env.local.example`
- `frontend/lib/config.ts`

**Acceptance Criteria**:
- [ ] All environment variables documented
- [ ] TypeScript types for environment config
- [ ] Validation for required variables at build time

---

### Task 1.3: Install Dependencies
**Status**: pending
**Priority**: P1
**User Story**: Infrastructure

**Description**: Install all required frontend dependencies

**Dependencies**:
- `better-auth` - Authentication
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `zod` - Validation
- `@hookform/resolvers` - Zod integration
- `clsx` - ClassName utility
- `tailwind-merge` - Tailwind merge utility

**Files to Modify**:
- `frontend/package.json`

**Acceptance Criteria**:
- [ ] All dependencies installed successfully
- [ ] Lock file updated
- [ ] TypeScript recognizes all package types

---

### Task 1.4: Set Up Folder Structure
**Status**: pending
**Priority**: P1
**User Story**: Infrastructure

**Description**: Create all directories and base files per architecture plan

**Requirements**:
- Create `app/`, `components/`, `lib/`, `hooks/`, `context/`, `types/` directories
- Create placeholder index files
- Set up path aliases in TypeScript

**Files to Create**:
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/app/page.tsx`
- Directory structure per plan section 1.3

**Acceptance Criteria**:
- [ ] All directories created
- [ ] Path aliases work in imports
- [ ] ESLint allows imports from `@/` alias

---

### Task 1.5: Configure ESLint and Prettier
**Status**: pending
**Priority**: P2
**User Story**: Infrastructure

**Description**: Configure code formatting and linting standards

**Requirements**:
- Set up ESLint configuration
- Configure Prettier with Tailwind plugin
- Add husky pre-commit hooks (optional)

**Files to Create/Modify**:
- `frontend/.eslintrc.json`
- `frontend/.prettierrc`
- `frontend/.prettierignore`

**Acceptance Criteria**:
- [ ] ESLint passes on new files
- [ ] Prettier formats code consistently
- [ ] No formatting errors in CI

---

## Phase 2: Auth Integration

### Task 2.1: Create Better Auth Configuration
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Set up Better Auth client provider with JWT handling

**Requirements**:
- Create auth client instance
- Configure base URL from environment
- Set up cookie storage for JWT

**Files to Create**:
- `frontend/lib/auth/provider.tsx`
- `frontend/lib/auth/client.ts`
- `frontend/lib/auth/config.ts`

**Acceptance Criteria**:
- [ ] Auth client initializes without errors
- [ ] Token storage uses HttpOnly cookies
- [ ] Auth provider wraps application

---

### Task 2.2: Create Auth Hooks
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Build custom hooks for authentication operations

**Requirements**:
- `useSession()` hook for session state
- `useLogin()` hook for sign-in
- `useRegister()` hook for sign-up
- `useLogout()` hook for sign-out

**Files to Create**:
- `frontend/lib/auth/hooks.ts`
- `frontend/hooks/useAuth.ts`

**Acceptance Criteria**:
- [ ] `useSession()` returns session and loading state
- [ ] `useLogin()` triggers sign-in flow
- [ ] `useRegister()` triggers sign-up flow
- [ ] `useLogout()` clears session

---

### Task 2.3: Create Auth Context
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Create React context for authentication state

**Requirements**:
- AuthContext provider
- Session state management
- Token refresh handling

**Files to Create**:
- `frontend/context/AuthContext.tsx`

**Acceptance Criteria**:
- [ ] Context provides session to all components
- [ ] Loading state managed correctly
- [ ] Session persists across page navigations

---

### Task 2.4: Create Login Page
**Status**: pending
**Priority**: P1
**User Story**: User Login

**Description**: Build login page with form and validation

**Requirements**:
- Email and password fields
- Form validation with Zod
- Error handling and display
- Redirect on success

**Files to Create**:
- `frontend/app/(auth)/login/page.tsx`
- `frontend/app/(auth)/login/layout.tsx`

**Acceptance Criteria**:
- [ ] Login form renders correctly
- [ ] Validation errors display for invalid input
- [ ] API errors display (wrong credentials)
- [ ] Redirects to dashboard on success

---

### Task 2.5: Create Login Form Component
**Status**: pending
**Priority**: P1
**User Story**: User Login

**Description**: Build reusable login form component

**Requirements**:
- Email input with validation
- Password input with validation
- Submit button with loading state
- "Don't have an account?" link

**Files to Create**:
- `frontend/components/forms/LoginForm.tsx`

**Acceptance Criteria**:
- [ ] Form fields validate on blur
- [ ] Submit button shows loading state
- [ ] Enter key submits form
- [ ] Keyboard navigation works

---

### Task 2.6: Create Registration Page
**Status**: pending
**Priority**: P1
**User Story**: User Registration

**Description**: Build registration page with form and validation

**Requirements**:
- Email and password fields
- Password confirmation
- Form validation with Zod
- Redirect on success

**Files to Create**:
- `frontend/app/(auth)/register/page.tsx`

**Acceptance Criteria**:
- [ ] Registration form renders correctly
- [ ] Email format validation works
- [ ] Password length validation works
- [ ] Passwords must match validation
- [ ] Redirects to dashboard on success

---

### Task 2.7: Create Registration Form Component
**Status**: pending
**Priority**: P1
**User Story**: User Registration

**Description**: Build reusable registration form component

**Requirements**:
- Email input with validation
- Password input with strength indicator
- Confirm password input
- Submit button with loading state

**Files to Create**:
- `frontend/components/forms/RegisterForm.tsx`

**Acceptance Criteria**:
- [ ] All fields validate correctly
- [ ] Password match validation works
- [ ] Email already registered error displays
- [ ] Form accessible via keyboard

---

### Task 2.8: Create Auth Layout
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Create layout for authentication pages

**Requirements**:
- Centered card layout
- App branding
- Minimal design

**Files to Create**:
- `frontend/app/(auth)/layout.tsx`

**Acceptance Criteria**:
- [ ] Login and register pages centered
- [ ] Consistent styling across auth pages
- [ ] Responsive design works

---

### Task 2.9: Implement Logout Functionality
**Status**: pending
**Priority**: P1
**User Story**: User Logout

**Description**: Build logout action and button

**Requirements**:
- Sign out function
- Logout button in header
- Redirect to login after logout

**Files to Modify/Create**:
- `frontend/components/layout/Header.tsx`
- `frontend/lib/auth/hooks.ts` (add signOut)

**Acceptance Criteria**:
- [ ] Logout clears session
- [ ] Redirects to login page
- [ ] Tokens cleared from cookies
- [ ] Cannot access protected routes after logout

---

### Task 2.10: Set Up Protected Routes Middleware
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Create Next.js middleware for route protection

**Requirements**:
- Protect `/tasks`, `/categories` routes
- Redirect unauthenticated users to login
- Prevent authenticated users from visiting auth pages

**Files to Create**:
- `frontend/middleware.ts`

**Acceptance Criteria**:
- [ ] Unauthenticated users redirected to /login
- [ ] Authenticated users redirected from /login to /tasks
- [ ] Middleware runs before page render
- [ ] Query parameters preserved on redirect

---

### Task 2.11: Create Protected Route Component
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Create client-side route guard component

**Requirements**:
- ProtectedRoute wrapper component
- Loading state while session checks
- Redirect if not authenticated

**Files to Create**:
- `frontend/components/auth/ProtectedRoute.tsx`

**Acceptance Criteria**:
- [ ] Shows loading spinner during auth check
- [ ] Redirects if not authenticated
- [ ] Renders children if authenticated
- [ ] Works with any child component

---

## Phase 3: Core Task UI

### Task 3.1: Create Dashboard Layout
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Create layout for authenticated dashboard pages

**Requirements**:
- Header with user info and logout
- Main content area
- Responsive navigation

**Files to Create**:
- `frontend/app/(dashboard)/layout.tsx`
- `frontend/components/layout/Header.tsx`
- `frontend/components/layout/Sidebar.tsx`

**Acceptance Criteria**:
- [ ] Header displays user email
- [ ] Logout button accessible
- [ ] Responsive sidebar/mobile menu
- [ ] Main content area properly sized

---

### Task 3.2: Create Dashboard Redirect Page
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Create root dashboard page that redirects to tasks

**Files to Create**:
- `frontend/app/(dashboard)/page.tsx`

**Acceptance Criteria**:
- [ ] Redirects to /tasks
- [ ] Shows loading state during redirect

---

### Task 3.3: Create Task List Page
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Build main task list dashboard page

**Requirements**:
- Task list container
- Filter and search UI
- "Add Task" button
- Loading and empty states

**Files to Create**:
- `frontend/app/(dashboard)/tasks/page.tsx`

**Acceptance Criteria**:
- [ ] Page loads with loading spinner
- [ ] Tasks display in list format
- [ ] "Add Task" button prominent
- [ ] Empty state shows when no tasks

---

### Task 3.4: Create Task List Component
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Build component to render task list

**Requirements**:
- Iterate through tasks
- Group by status (optional)
- Responsive layout

**Files to Create**:
- `frontend/components/tasks/TaskList.tsx`

**Acceptance Criteria**:
- [ ] Renders all tasks
- [ ] Handles empty list
- [ ] Responsive grid/list layout
- [ ] Maintains task order

---

### Task 3.5: Create Task Card Component
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Build individual task card component

**Requirements**:
- Task title
- Completion checkbox
- Edit and delete buttons
- Priority indicator
- Due date display

**Files to Create**:
- `frontend/components/tasks/TaskCard.tsx`

**Acceptance Criteria**:
- [ ] Shows all task details
- [ ] Checkbox toggles completion
- [ ] Edit/Delete buttons work
- [ ] Visual priority indicator
- [ ] Due date formatted correctly

---

### Task 3.6: Create Task Item Component
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Build list item variant for compact view

**Requirements**:
- Compact layout
- Quick actions
- Status badge

**Files to Create**:
- `frontend/components/tasks/TaskItem.tsx`

**Acceptance Criteria**:
- [ ] Compact display
- [ ] Quick toggle completion
- [ ] Status color coding
- [ ] Hover actions visible

---

### Task 3.7: Create Task Filter Component
**Status**: pending
**Priority**: P2
**User Story**: View Task Dashboard

**Description**: Build filtering UI for task list

**Requirements**:
- Search by title
- Filter by status (pending, completed)
- Filter by priority
- Clear filters option

**Files to Create**:
- `frontend/components/tasks/TaskFilter.tsx`

**Acceptance Criteria**:
- [ ] Search filters by title
- [ ] Status filter works
- [ ] Priority filter works
- [ ] Clear filters resets all

---

### Task 3.8: Create Empty State Component
**Status**: pending
**Priority**: P1
**User Story**: View Task Dashboard

**Description**: Build empty state for no tasks scenario

**Requirements**:
- Icon placeholder
- Title and message
- Call-to-action button

**Files to Create**:
- `frontend/components/ui/EmptyState.tsx`

**Acceptance Criteria**:
- [ ] Displays when no tasks
- [ ] "Create your first task" button
- [ ] Helpful message text

---

### Task 3.9: Create Base UI Components
**Status**: pending
**Priority**: P1
**User Story**: UI Components

**Description**: Build reusable UI component library

**Components**:
- Button (variants: primary, secondary, danger, ghost)
- Input (with label support)
- Label
- Card (for task cards)
- Select (for priority, category)
- Checkbox

**Files to Create**:
- `frontend/components/ui/Button.tsx`
- `frontend/components/ui/Input.tsx`
- `frontend/components/ui/Label.tsx`
- `frontend/components/ui/Card.tsx`
- `frontend/components/ui/Select.tsx`
- `frontend/components/ui/Checkbox.tsx`

**Acceptance Criteria**:
- [ ] Button variants work correctly
- [ ] Input shows validation errors
- [ ] Label associates with input
- [ ] Checkbox toggles correctly

---

### Task 3.10: Create Loading Spinner Component
**Status**: pending
**Priority**: P1
**User Story**: UI Components

**Description**: Build loading spinner and states

**Components**:
- LoadingSpinner (sizes: sm, md, lg)
- LoadingOverlay (full-screen)
- Skeleton (for loading states)

**Files to Create**:
- `frontend/components/ui/LoadingSpinner.tsx`
- `frontend/components/ui/LoadingOverlay.tsx`
- `frontend/components/ui/Skeleton.tsx`

**Acceptance Criteria**:
- [ ] Spinner animates correctly
- [ ] Sizes render properly
- [ ] Overlay blocks interaction
- [ ] Skeleton resembles content

---

### Task 3.11: Create Modal Component
**Status**: pending
**Priority**: P2
**User Story**: UI Components

**Description**: Build reusable modal dialog

**Requirements**:
- Overlay backdrop
- Close on escape
- Close on backdrop click
- Focus trap

**Files to Create**:
- `frontend/components/ui/Modal.tsx`

**Acceptance Criteria**:
- [ ] Modal opens/closes correctly
- [ ] Escape key closes modal
- [ ] Backdrop click closes modal
- [ ] Focus trapped inside modal

---

## Phase 4: API Wiring

### Task 4.1: Create API Client Configuration
**Status**: pending
**Priority**: P1
**User Story**: API Integration

**Description**: Set up Axios client with interceptors

**Requirements**:
- Base URL from environment
- Request interceptor for JWT
- Response interceptor for errors
- Timeout configuration

**Files to Create**:
- `frontend/lib/api/client.ts`

**Acceptance Criteria**:
- [ ] Client sends requests to correct URL
- [ ] JWT token attached to requests
- [ ] 401 errors trigger logout
- [ ] Timeout handled gracefully

---

### Task 4.2: Define API Endpoints
**Status**: pending
**Priority**: P1
**User Story**: API Integration

**Description**: Create centralized endpoint definitions

**Requirements**:
- Auth endpoints
- Task CRUD endpoints
- Category endpoints (if available)

**Files to Create**:
- `frontend/lib/api/endpoints.ts`

**Acceptance Criteria**:
- [ ] All endpoints defined
- [ ] URL parameters work correctly
- [ ] Type-safe endpoint access

---

### Task 4.3: Define TypeScript Types
**Status**: pending
**Priority**: P1
**User Story**: API Integration

**Description**: Create TypeScript types matching backend

**Requirements**:
- Task type
- User type
- API response types
- Request body types

**Files to Create**:
- `frontend/types/task.ts`
- `frontend/types/user.ts`
- `frontend/types/api.ts`

**Acceptance Criteria**:
- [ ] Task type matches backend schema
- [ ] All fields optional/required correctly typed
- [ ] API response types defined

---

### Task 4.4: Create Task API Module
**Status**: pending
**Priority**: P1
**User Story**: API Integration

**Description**: Build API functions for task operations

**Requirements**:
- getAll tasks
- getById task
- create task
- update task
- delete task
- complete task

**Files to Create**:
- `frontend/lib/api/tasks.ts`

**Acceptance Criteria**:
- [ ] getAll returns task list
- [ ] getById returns single task
- [ ] create returns created task
- [ ] update returns updated task
- [ ] delete completes without error
- [ ] complete toggles status

---

### Task 4.5: Create useTasks Hook
**Status**: pending
**Priority**: P1
**User Story**: API Integration

**Description**: Build React hook for task data management

**Requirements**:
- Fetch tasks with loading state
- Create task with optimistic update
- Update task with optimistic update
- Delete task with optimistic update
- Error handling

**Files to Create**:
- `frontend/hooks/useTasks.ts`

**Acceptance Criteria**:
- [ ] fetchTasks loads and caches data
- [ ] createTask adds to local list
- [ ] updateTask updates in local list
- [ ] deleteTask removes from local list
- [ ] Error state captures failures
- [ ] Loading state works correctly

---

### Task 4.6: Connect Task List to API
**Status**: pending
**Priority**: P1
**User Story**: Create New Task

**Description**: Wire task list page to useTasks hook

**Requirements**:
- Fetch tasks on mount
- Display loading state
- Handle errors
- Refresh after task changes

**Files to Modify**:
- `frontend/app/(dashboard)/tasks/page.tsx`
- `frontend/components/tasks/TaskList.tsx`

**Acceptance Criteria**:
- [ ] Tasks load on page load
- [ ] Loading spinner shows
- [ ] Error state displays on failure
- [ ] Tasks update after CRUD

---

### Task 4.7: Create Task Form Component
**Status**: pending
**Priority**: P1
**User Story**: Create New Task

**Description**: Build form for creating/editing tasks

**Requirements**:
- Title input (required)
- Description textarea (optional)
- Priority select
- Category select
- Due date picker

**Files to Create**:
- `frontend/components/forms/TaskForm.tsx`

**Acceptance Criteria**:
- [ ] All fields validate correctly
- [ ] Title required validation
- [ ] Submit creates/updates task
- [ ] Cancel closes form

---

### Task 4.8: Create New Task Page
**Status**: pending
**Priority**: P1
**User Story**: Create New Task

**Description**: Build page for creating new tasks

**Requirements**:
- Task form
- Page title
- Back to tasks link

**Files to Create**:
- `frontend/app/(dashboard)/tasks/new/page.tsx`

**Acceptance Criteria**:
- [ ] Form renders correctly
- [ ] Creates task on submit
- [ ] Redirects to task list
- [ ] Shows success message

---

### Task 4.9: Create Edit Task Page
**Status**: pending
**Priority**: P1
**User Story**: Edit Task

**Description**: Build page for editing existing tasks

**Requirements**:
- Load task data on mount
- Pre-fill form with task data
- Update on submit
- Handle 404 if task not found

**Files to Create**:
- `frontend/app/(dashboard)/tasks/[id]/page.tsx`

**Acceptance Criteria**:
- [ ] Loads task data
- [ ] Pre-fills form fields
- [ ] Updates task on submit
- [ ] 404 page for invalid ID
- [ ] User isolation enforced

---

### Task 4.10: Implement Task Completion Toggle
**Status**: pending
**Priority**: P1
**User Story**: Toggle Task Completion

**Description**: Add toggle functionality for task completion

**Requirements**:
- Checkbox in TaskCard
- API call to complete endpoint
- Optimistic UI update
- Visual status change

**Files to Modify**:
- `frontend/components/tasks/TaskCard.tsx`
- `frontend/hooks/useTasks.ts`

**Acceptance Criteria**:
- [ ] Checkbox toggles completion
- [ ] Visual indicator changes
- [ ] API called with correct ID
- [ ] Reverts on API failure

---

### Task 4.11: Implement Delete Task
**Status**: pending
**Priority**: P1
**User Story**: Delete Task

**Description**: Add delete functionality with confirmation

**Requirements**:
- Delete button in TaskCard
- Confirmation dialog
- API call to delete
- Optimistic removal

**Files to Modify/Create**:
- `frontend/components/tasks/TaskCard.tsx`
- `frontend/components/ui/ConfirmDialog.tsx`

**Acceptance Criteria**:
- [ ] Delete button shows confirmation
- [ ] Cancel keeps task
- [ ] Confirm removes task
- [ ] Task removed from list
- [ ] User isolation enforced

---

### Task 4.12: Handle 401 Errors Globally
**Status**: pending
**Priority**: P1
**User Story**: User Authentication

**Description**: Handle expired/invalid tokens gracefully

**Requirements**:
- Detect 401 responses
- Clear session
- Redirect to login
- Show session expired message

**Files to Modify**:
- `frontend/lib/api/client.ts`

**Acceptance Criteria**:
- [ ] 401 triggers logout
- [ ] Redirects to login
- [ ] Message explains session expired
- [ ] No infinite redirect loop

---

## Phase 5: UX Polish & Validation

### Task 5.1: Add Form Validation Schemas
**Status**: pending
**Priority**: P1
**User Story**: Validation

**Description**: Create Zod validation schemas for all forms

**Requirements**:
- Login schema
- Register schema
- Task create/update schema

**Files to Create**:
- `frontend/lib/validation/schemas.ts`

**Acceptance Criteria**:
- [ ] Login validates email/password
- [ ] Register validates email/match passwords
- [ ] Task validates required title
- [ ] Custom error messages clear

---

### Task 5.2: Create Toast Notification System
**Status**: pending
**Priority**: P2
**User Story**: UX Polish

**Description**: Build toast notification component

**Requirements**:
- Success toasts (create, update, delete)
- Error toasts (validation, API errors)
- Auto-dismiss after 3 seconds
- Multiple toasts stacked

**Files to Create**:
- `frontend/components/ui/Toast.tsx`
- `frontend/context/ToastContext.tsx`

**Acceptance Criteria**:
- [ ] Success toast shows on actions
- [ ] Error toast shows on failures
- [ ] Auto-dismiss works
- [ ] Can dismiss manually

---

### Task 5.3: Integrate Toast Notifications
**Status**: pending
**Priority**: P2
**User Story**: UX Polish

**Description**: Add toast notifications to all operations

**Requirements**:
- Task created toast
- Task updated toast
- Task deleted toast
- Login/register success
- API error toasts

**Files to Modify**:
- `frontend/components/forms/TaskForm.tsx`
- `frontend/hooks/useTasks.ts`
- `frontend/components/forms/LoginForm.tsx`
- `frontend/components/forms/RegisterForm.tsx`

**Acceptance Criteria**:
- [ ] Toast on successful create
- [ ] Toast on successful update
- [ ] Toast on successful delete
- [ ] Toast on login/register
- [ ] Toast on API errors

---

### Task 5.4: Add Keyboard Navigation
**Status**: pending
**Priority**: P2
**User Story**: Accessibility

**Description**: Ensure all interactive elements are keyboard accessible

**Requirements**:
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys in select menus

**Acceptance Criteria**:
- [ ] Focus visible on all elements
- [ ] Tab order logical
- [ ] Skip links for main content
- [ ] No keyboard traps

---

### Task 5.5: Implement Focus Management
**Status**: pending
**Priority**: P2
**User Story**: Accessibility

**Description**: Add focus management for modals and navigation

**Requirements**:
- Focus trap in modals
- Return focus on modal close
- Focus indicator styles

**Files to Modify**:
- `frontend/components/ui/Modal.tsx`

**Acceptance Criteria**:
- [ ] Focus trapped in modal
- [ ] Focus returns on close
- [ ] Visible focus indicator
- [ ] No focus loss on navigation

---

### Task 5.6: Test Responsive Design
**Status**: pending
**Priority**: P2
**User Story**: UX Polish

**Description**: Verify UI works on all viewport sizes

**Requirements**:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large desktop (1280px+)

**Acceptance Criteria**:
- [ ] No horizontal scroll on mobile
- [ ] Touch targets 44px+ on mobile
- [ ] Cards stack correctly on mobile
- [ ] Sidebar collapses on mobile
- [ ] Forms readable on all sizes

---

### Task 5.7: Test Accessibility
**Status**: pending
**Priority**: P2
**User Story**: Accessibility

**Description**: Verify accessibility compliance

**Requirements**:
- Color contrast 4.5:1 minimum
- ARIA labels where needed
- Screen reader compatibility
- Error associations with inputs

**Acceptance Criteria**:
- [ ] Contrast ratio passes check
- [ ] All inputs have labels
- [ ] Errors announced to screen reader
- [ ] Icons have aria-hidden or labels

---

### Task 5.8: Manual Testing - Authentication
**Status**: pending
**Priority**: P1
**User Story**: Testing

**Description**: Manual testing for authentication flows

**Tests**:
- Registration with valid credentials
- Registration with invalid email
- Registration with short password
- Login with valid credentials
- Login with invalid password
- Logout functionality
- Protected route redirect

**Acceptance Criteria**:
- [ ] All auth flows work correctly
- [ ] Validation messages display
- [ ] Redirects work properly
- [ ] Session clears on logout

---

### Task 5.9: Manual Testing - Task Operations
**Status**: pending
**Priority**: P1
**User Story**: Testing

**Description**: Manual testing for task CRUD operations

**Tests**:
- View task dashboard
- Create new task with all fields
- Create task without title (validation)
- Edit task details
- Toggle task completion
- Delete task with confirmation
- Filter tasks by status/priority

**Acceptance Criteria**:
- [ ] Dashboard shows user's tasks only
- [ ] Create task adds to list
- [ ] Validation prevents empty title
- [ ] Edit updates task
- [ ] Toggle changes status
- [ ] Delete removes task
- [ ] User isolation enforced

---

### Task 5.10: Manual Testing - Edge Cases
**Status**: pending
**Priority**: P1
**User Story**: Testing

**Description**: Manual testing for edge cases and error handling

**Tests**:
- API unavailable (network error)
- Token expiration during use
- Multiple rapid submissions
- Empty field submissions
- Invalid task ID navigation
- Session persistence across tabs

**Acceptance Criteria**:
- [ ] Network error shows friendly message
- [ ] Session expired redirects to login
- [ ] Double submissions prevented
- [ ] Invalid ID shows 404
- [ ] Session syncs across tabs

---

### Task 5.11: Final Polish and Cleanup
**Status**: pending
**Priority**: P2
**User Story**: UX Polish

**Description**: Final review and polish

**Requirements**:
- Review all error messages
- Verify loading states
- Check responsive breakpoints
- Clean up console warnings
- Verify production build

**Files to Modify**:
- Various components as needed

**Acceptance Criteria**:
- [ ] No console errors
- [ ] All loading states visible
- [ ] Production build succeeds
- [ ] Lighthouse score > 90

---

## Task Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Setup | 5 tasks | pending |
| Phase 2: Auth | 11 tasks | pending |
| Phase 3: Core UI | 11 tasks | pending |
| Phase 4: API Wiring | 12 tasks | pending |
| Phase 5: UX Polish | 11 tasks | pending |
| **Total** | **50 tasks** | |

---

## Dependencies

- **Phase 1** must complete before Phase 2
- **Phase 2** must complete before Phase 3
- **Phase 3** must complete before Phase 4
- **Phase 4** must complete before Phase 5

---

## Reference Files

- Specification: `specs/2-frontend-nextjs/spec.md`
- Architecture Plan: `specs/2-frontend-nextjs/plan.md`
- Backend API: `specs/1-backend-tasks-api/` (for API contracts)
- Constitution: `.specify/memory/constitution.md`
