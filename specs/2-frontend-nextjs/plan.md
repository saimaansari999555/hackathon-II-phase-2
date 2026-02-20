# Architecture Plan: Todo Frontend with Authentication

**Feature Branch**: `2-frontend-nextjs`
**Created**: 2026-01-10
**Status**: Draft
**Spec Reference**: `specs/2-frontend-nextjs/spec.md`

---

## 1. High-Level Architecture

### 1.1 System Context

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Todo Frontend Application                         │
│                                                                     │
│  ┌──────────────┐    ┌──────────────────────────────────────────┐  │
│  │   Browser    │───▶│  Next.js Application (App Router)        │  │
│  │   User       │    │                                          │  │
│  └──────────────┘    │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │  Pages     │  │  Components      │   │  │
│                      │  │  (app/)    │  │  (ui/, features/)│   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │  Hooks     │  │  Context/Store   │   │  │
│                      │  │  (auth,    │  │  (User, Tasks,   │   │  │
│                      │  │   api)     │  │   UI State)      │   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌────────────┐  ┌──────────────────┐   │  │
│                      │  │  Better    │  │  API Client      │   │  │
│                      │  │  Auth      │  │  (axios/fetch)   │   │  │
│                      │  └─────┬──────┘  └──────────────────┘   │  │
│                      │        │                                 │  │
│                      │        ▼                                 │  │
│                      │  ┌──────────────────────────────────┐   │  │
│                      │  │    HTTP Requests                 │   │  │
│                      │  │    (with JWT tokens)             │   │  │
│                      │  └──────────────────────────────────┘   │  │
│                      └──────────────────────────────────────────┘  │
│                               │                                    │
│                               ▼                                    │
│                      ┌─────────────────────────┐                   │
│                      │  FastAPI Backend        │                   │
│                      │  (REST API + JWT Auth)  │                   │
│                      └─────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16+ (App Router) | Page routing, SSR/SSG |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first styling |
| **Auth** | Better Auth | JWT token management |
| **HTTP Client** | Axios | API communication |
| **State** | React Context + Hooks | Local state management |
| **Forms** | React Hook Form + Zod | Form handling, validation |

### 1.3 Component Architecture Pattern

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group (login, register)
│   │   ├── login/page.tsx        # Login page (client component)
│   │   └── register/page.tsx     # Register page (client component)
│   │
│   ├── (dashboard)/              # Protected dashboard group
│   │   ├── layout.tsx            # Dashboard layout with nav
│   │   ├── page.tsx              # Task list dashboard
│   │   └── tasks/
│   │       ├── page.tsx          # Task list view
│   │       ├── new/page.tsx      # Create task
│   │       └── [id]/page.tsx     # Edit task
│   │
│   ├── api/                      # API routes (if needed)
│   ├── globals.css               # Tailwind imports
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Root redirect
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   │
│   ├── forms/                    # Form components
│   │   ├── TaskForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   │
│   ├── tasks/                    # Task-specific components
│   │   ├── TaskList.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskFilter.tsx
│   │
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── lib/                          # Utilities and configurations
│   ├── api/                      # API client
│   │   ├── client.ts             # Axios instance
│   │   ├── endpoints.ts          # API endpoint definitions
│   │   └── types.ts              # TypeScript types
│   │
│   ├── auth/                     # Authentication utilities
│   │   ├── provider.tsx          # Better Auth provider
│   │   ├── hooks.ts              # Auth hooks
│   │   └── utils.ts              # Auth helpers
│   │
│   ├── utils/                    # Utility functions
│   │   ├── format.ts             # Date formatting
│   │   └── validation.ts         # Zod schemas
│   │
│   └── constants.ts              # App constants
│
├── hooks/                        # Custom React hooks
│   ├── useTasks.ts               # Task data hook
│   ├── useAuth.ts                # Authentication hook
│   └── useUI.ts                  # UI state hook
│
├── context/                      # React Context providers
│   ├── AuthContext.tsx
│   ├── TaskContext.tsx
│   └── UIContext.tsx
│
├── types/                        # TypeScript type definitions
│   ├── task.ts
│   ├── user.ts
│   └── api.ts
│
├── styles/                       # Global styles
│   └── globals.css
│
└── public/                       # Static assets
    └── images/
```

---

## 2. Authentication Flow with Better Auth

### 2.1 Authentication Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Authentication Flow                                │
└──────────────────────────────────────────────────────────────────────────┘

  ┌──────────┐
  │  User    │  Enters credentials on /login or /register
  └────┬─────┘
       │
       ▼
  ┌─────────────────────────┐
  │  Better Auth Provider   │  ◀── Wraps app with AuthProvider
  │  (Client-side)          │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  POST /api/v1/auth/     │  ──▶ Call backend auth endpoints
  │  login or register      │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  JWT Token Received     │  ◀── Backend returns JWT
  │  (access + refresh)     │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Store in HttpOnly      │  ◀── Secure cookie storage
  │  Cookies (Better Auth)  │
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Token Attached to      │  ──▶ Axios interceptor adds token
  │  All API Requests       │      to Authorization header
  └─────────┬───────────────┘
            │
            ▼
  ┌─────────────────────────┐
  │  Protected Routes       │  ──▶ Check auth state before rendering
  │  (Dashboard, Tasks)     │      Redirect to /login if not authenticated
  └─────────────────────────┘
```

### 2.2 Token Management Strategy

**Decision**: Use HttpOnly cookies for JWT storage

| Storage Option | Pros | Cons |
|----------------|------|------|
| **localStorage** | Easy to access | XSS vulnerable |
| **sessionStorage** | Session-scoped | XSS vulnerable |
| **HttpOnly Cookies (chosen)** | XSS protected, secure | CSRF risk (mitigated) |

**Rationale for HttpOnly Cookies**:
- Protects against XSS attacks (tokens not accessible via JavaScript)
- Automatically sent with requests
- Better Auth handles cookie management securely
- CSRF protection via SameSite policies and backend validation

### 2.3 Auth Implementation Pattern

```typescript
// lib/auth/provider.tsx
"use client";

import { createAuthClient } from "better-auth/client";
import { SessionProvider } from "@/context/SessionContext";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

// lib/auth/hooks.ts
export function useSession() {
  const { data: session, isLoading } = useAuthClient.useSession();
  return { session, isLoading, user: session?.user };
}

export function useLogin() {
  const { signIn } = useAuthClient.useSignIn();
  return signIn;
}

export function useRegister() {
  const { signUp } = useAuthClient.useSignUp();
  return signUp;
}
```

---

## 3. API Integration Strategy

### 3.1 API Client Configuration

```typescript
// lib/api/client.ts
import axios from "axios";
import { authClient } from "@/lib/auth/provider";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await authClient.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      await authClient.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3.2 API Endpoint Definitions

```typescript
// lib/api/endpoints.ts
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
  LOGOUT: "/api/v1/auth/logout",

  // Tasks
  TASKS: "/api/v1/tasks",
  TASK_DETAIL: (id: string) => `/api/v1/tasks/${id}`,
  TASK_CREATE: "/api/v1/tasks",
  TASK_UPDATE: (id: string) => `/api/v1/tasks/${id}`,
  TASK_DELETE: (id: string) => `/api/v1/tasks/${id}`,
  TASK_COMPLETE: (id: string) => `/api/v1/tasks/${id}/complete`,

  // Categories
  CATEGORIES: "/api/v1/categories",
  CATEGORY_DETAIL: (id: string) => `/api/v1/categories/${id}`,
} as const;

export type Endpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
```

### 3.3 API Client Usage Pattern

```typescript
// lib/api/tasks.ts
import apiClient from "./client";
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types";

export const taskApi = {
  async getAll(params?: TaskFilters): Promise<TaskListResponse> {
    const { data } = await apiClient.get(API_ENDPOINTS.TASKS, { params });
    return data;
  },

  async getById(id: string): Promise<Task> {
    const { data } = await apiClient.get(API_ENDPOINTS.TASK_DETAIL(id));
    return data;
  },

  async create(request: CreateTaskRequest): Promise<Task> {
    const { data } = await apiClient.post(API_ENDPOINTS.TASK_CREATE, request);
    return data;
  },

  async update(id: string, request: UpdateTaskRequest): Promise<Task> {
    const { data } = await apiClient.put(API_ENDPOINTS.TASK_UPDATE(id), request);
    return data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TASK_DELETE(id));
  },

  async complete(id: string): Promise<Task> {
    const { data } = await apiClient.post(API_ENDPOINTS.TASK_COMPLETE(id));
    return data;
  },
};
```

---

## 4. Page & Component Structure

### 4.1 Route Structure

```
app/
├── (auth)/                    # Auth route group - no auth required
│   ├── login/
│   │   └── page.tsx          # /login
│   ├── register/
│   │   └── page.tsx          # /register
│   └── layout.tsx            # Auth layout (centered, minimal)
│
├── (dashboard)/               # Protected route group - auth required
│   ├── layout.tsx            # Dashboard layout with nav/sidebar
│   ├── page.tsx              # /dashboard (redirect to tasks)
│   ├── tasks/
│   │   ├── page.tsx          # /tasks (list)
│   │   ├── new/
│   │   │   └── page.tsx      # /tasks/new (create)
│   │   └── [id]/
│   │       └── page.tsx      # /tasks/:id (edit)
│   └── categories/
│       └── page.tsx          # /categories (future)
│
├── api/                       # API routes (if needed for SSR)
│   └── auth/
│       └── [...nextauth]/    # NextAuth.js handlers
│
├── globals.css               # Tailwind imports
├── layout.tsx                # Root layout with AuthProvider
└── page.tsx                  # Root (redirects based on auth state)
```

### 4.2 Component Hierarchy

```
Root Layout (app/layout.tsx)
├── AuthProvider
│   └── AuthLayout
│
Dashboard Layout ((dashboard)/layout.tsx)
├── Header (user info, logout)
├── Sidebar (navigation)
└── Page Content
    ├── Task Dashboard (app/(dashboard)/tasks/page.tsx)
    │   ├── TaskFilter (search, status, priority)
    │   ├── TaskList
    │   │   └── TaskItem (x N)
    │   │       ├── TaskCard
    │   │       ├── Checkbox (complete)
    │   │       ├── Edit Button
    │   │       └── Delete Button
    │   └── Empty State
    │
    ├── Create Task Modal/Page
    │   └── TaskForm
    │       ├── Title Input
    │       ├── Description Input
    │       ├── Priority Select
    │       ├── Category Select
    │       └── Due Date Picker
    │
    └── Edit Task Page (app/(dashboard)/tasks/[id]/page.tsx)
        └── TaskForm (prefilled)
```

---

## 5. Protected Route Handling

### 5.1 Route Protection Strategy

```typescript
// middleware.ts (Next.js middleware)
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/tasks", "/categories"];
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard if accessing auth route with session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### 5.2 Client-Side Route Guard

```typescript
// components/auth/ProtectedRoute.tsx
"use client";

import { useSession } from "@/lib/auth/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
```

---

## 6. UI State Handling

### 6.1 State Management Architecture

| State Type | Solution | Purpose |
|------------|----------|---------|
| **Authentication** | Better Auth + Context | User session, tokens |
| **Tasks Data** | React Query / SWR | Server state, caching |
| **UI State** | React Context | Modals, toasts, filters |
| **Form State** | React Hook Form | Form values, validation |

### 6.2 Task Data Hook

```typescript
// hooks/useTasks.ts
import { useState, useCallback } from "react";
import { taskApi } from "@/lib/api/tasks";
import type { Task, TaskFilters } from "@/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (filters?: TaskFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskApi.getAll(filters);
      setTasks(response.items);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskRequest) => {
    setError(null);
    try {
      const task = await taskApi.create(data);
      setTasks((prev) => [task, ...prev]);
      return task;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskRequest) => {
    setError(null);
    try {
      const task = await taskApi.update(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      return task;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    setError(null);
    try {
      await taskApi.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
      throw err;
    }
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setTasks,
  };
}
```

### 6.3 UI State Context

```typescript
// context/UIContext.tsx
interface UIState {
  isModalOpen: boolean;
  modalContent: string | null;
  toast: Toast | null;
  filters: TaskFilters;
}

interface Toast {
  type: "success" | "error" | "info";
  message: string;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UIState>({
    isModalOpen: false,
    modalContent: null,
    toast: null,
    filters: {},
  });

  const showToast = useCallback((toast: Toast) => {
    setState((prev) => ({ ...prev, toast }));
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setState((prev) => ({ ...prev, toast: null }));
    }, 3000);
  }, []);

  const openModal = useCallback((content: string) => {
    setState((prev) => ({ ...prev, isModalOpen: true, modalContent: content }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false, modalContent: null }));
  }, []);

  return (
    <UIContext.Provider value={{ ...state, showToast, openModal, closeModal }}>
      {children}
      {/* Toast Component renders here if state.toast is not null */}
    </UIContext.Provider>
  );
}
```

---

## 7. Error & Loading UX Patterns

### 7.1 Loading States

```typescript
// components/ui/LoadingSpinner.tsx
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-600`} />
    </div>
  );
}

// components/ui/LoadingOverlay.tsx
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// hooks/useLoading.ts
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingMessage, setLoadingMessage] = useState("");

  const withLoading = useCallback(async <T,>(
    promise: Promise<T>,
    message = "Loading..."
  ): Promise<T> => {
    setIsLoading(true);
    setLoadingMessage(message);
    try {
      return await promise;
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }, []);

  return { isLoading, loadingMessage, withLoading, setIsLoading };
}
```

### 7.2 Error States

```typescript
// components/ui/ErrorState.tsx
interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 text-red-500 mb-4">
        <ExclamationCircleIcon />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

// components/ui/EmptyState.tsx
interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 text-gray-300 mb-4">
        <ClipboardDocumentListIcon />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
```

---

## 8. Key Architectural Decisions

### 8.1 Token Storage Strategy

**Decision**: HttpOnly cookies via Better Auth

| Option | Pros | Cons |
|--------|------|------|
| **HttpOnly Cookies (chosen)** | XSS protected, auto-send | CSRF risk (mitigated) |
| **localStorage** | Easy access | XSS vulnerable |
| **sessionStorage** | Session-scoped | XSS vulnerable |

**Rationale**: Security-first approach. Better Auth handles cookie security including SameSite attributes and automatic rotation.

### 8.2 API Client Abstraction

**Decision**: Axios with interceptors

| Option | Pros | Cons |
|--------|------|------|
| **Axios (chosen)** | Interceptors, auto-JSON, cancellation | Slightly larger bundle |
| **fetch** | No extra bundle | Manual interceptors needed |

**Rationale**: Axios interceptors simplify token attachment and error handling. Consistent with Better Auth patterns.

### 8.3 Protected Route Handling

**Decision**: Next.js Middleware + Client-side Guards

| Layer | Purpose |
|-------|---------|
| **Middleware** | Server-side redirect before page render |
| **Client Component** | Additional check, loading state handling |
| **API Layer** | 401 response for any bypass attempts |

**Rationale**: Defense in depth. Middleware provides fastest redirect, client handles UX.

### 8.4 State Management Strategy

| State | Solution | Rationale |
|-------|----------|-----------|
| **Auth** | Better Auth + Context | Built-in JWT handling |
| **Server Data** | React Query/SWR | Caching, deduping, refresh |
| **UI State** | Context | Simple, localized |
| **Forms** | React Hook Form + Zod | Performance, validation |

### 8.5 Component Patterns

| Pattern | Usage |
|---------|-------|
| **Server Components** | Layouts, data fetching pages |
| **Client Components** | Interactive UI, forms, hooks |
| **Composition** | Small components composed into features |

---

## 9. Testing Strategy

### 9.1 Testing Categories

| Type | Tools | Coverage |
|------|-------|----------|
| **Manual Testing** | Browser flows | User journeys, UI/UX |
| **Component Tests** | React Testing Library | Component behavior |
| **Integration Tests** | Playwright | E2E user flows |

### 9.2 Manual Verification Checklist

| Category | Test | Expected Result |
|----------|------|-----------------|
| **Registration** | Complete registration flow | Redirect to dashboard, task visible |
| **Login** | Login with valid credentials | Redirect to dashboard, tasks load |
| **Login** | Login with invalid credentials | Error message displayed |
| **Logout** | Click logout button | Redirect to login, session cleared |
| **Dashboard** | View task list | Only own tasks visible |
| **Dashboard** | Empty state | Empty state with CTA displayed |
| **Create Task** | Create valid task | Task appears in list |
| **Create Task** | Submit without title | Validation error displayed |
| **Edit Task** | Update task details | Changes reflected in list |
| **Delete Task** | Delete with confirmation | Task removed from list |
| **Complete** | Toggle task completion | Status changes, visual update |
| **User Isolation** | View as other user | Other user's tasks not visible |
| **Responsive** | Test mobile/tablet/desktop | UI adapts correctly |
| **Accessibility** | Keyboard navigation | All features keyboard accessible |
| **Error Handling** | API failure | Error message displayed |
| **Session Expiry** | Token expires | Redirect to login |

### 9.3 Success Criteria Validation

| Criterion | Metric | Validation Method |
|-----------|--------|-------------------|
| Registration time | < 2 minutes | Manual timing |
| Login time | < 30 seconds | Manual timing |
| Create task time | < 15 seconds | Manual timing |
| First-attempt success | > 95% | Track user success rate |
| JWT attachment | 100% | DevTools network inspection |
| User isolation | Zero violations | Multi-user testing |
| Dashboard load | < 2 seconds | Performance timing |
| Keyboard access | 100% | Manual keyboard testing |
| Responsive | All viewports | Browser devTools |

---

## 10. Implementation Phases

### Phase 1: Project Setup & Config
- Initialize Next.js project with TypeScript and Tailwind
- Configure environment variables
- Set up folder structure
- Install dependencies (Better Auth, Axios, React Hook Form, Zod)
- Configure ESLint and Prettier

### Phase 2: Auth Integration
- Set up Better Auth provider
- Create login page and form
- Create registration page and form
- Implement logout functionality
- Set up protected routes (middleware + guards)
- Test auth flow

### Phase 3: Core Task UI
- Create task list dashboard
- Build task card and list components
- Implement task filtering UI
- Create empty and loading states
- Build reusable UI components (Button, Input, Modal, Toast)

### Phase 4: API Wiring
- Configure API client with JWT interceptors
- Implement task CRUD API calls
- Connect UI to API (useTasks hook)
- Handle loading and error states
- Implement optimistic updates

### Phase 5: UX Polish & Validation
- Add form validation (Zod schemas)
- Implement toast notifications
- Add keyboard navigation
- Test responsiveness
- Manual testing against success criteria
- Accessibility audit

---

## 11. Configuration

### 11.1 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |
| `BETTER_AUTH_URL` | Yes | Backend auth URL |
| `NEXT_PUBLIC_APP_NAME` | No | App name for UI |
| `NEXT_PUBLIC_APP_URL` | Yes | Frontend URL (for CORS) |

### 11.2 Example .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:8000/api/v1/auth
NEXT_PUBLIC_APP_NAME=Todo App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 12. References

- Specification: `specs/2-frontend-nextjs/spec.md`
- Constitution: `.specify/memory/constitution.md`
- Skills: `skills/nextjs-frontend-generation-skill.md`
- Backend: `specs/1-backend-tasks-api/` (API contracts)
