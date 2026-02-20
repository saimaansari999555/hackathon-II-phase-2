import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters,
  TaskListResponse,
} from "@/types/task";

export const taskApi = {
  async getAll(filters?: TaskFilters): Promise<TaskListResponse> {
    const { data } = await apiClient.get(API_ENDPOINTS.TASKS, { params: filters });
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
    const { data } = await apiClient.patch(API_ENDPOINTS.TASK_COMPLETE(id));
    return data;
  },
};
