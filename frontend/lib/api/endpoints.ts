export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
  LOGOUT: "/api/v1/auth/logout",
  SESSION: "/api/v1/auth/session",

  // Tasks
  TASKS: "/api/v1/tasks/",
  TASK_DETAIL: (id: string) => `/api/v1/tasks/${id}`,
  TASK_CREATE: "/api/v1/tasks/",
  TASK_UPDATE: (id: string) => `/api/v1/tasks/${id}`,
  TASK_DELETE: (id: string) => `/api/v1/tasks/${id}`,
  TASK_COMPLETE: (id: string) => `/api/v1/tasks/${id}/complete`,

  // Categories
  CATEGORIES: "/api/v1/categories",
  CATEGORY_DETAIL: (id: string) => `/api/v1/categories/${id}`,
} as const;

export type Endpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
