import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Registration validation schema
export const registerSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// Task validation schemas
export const taskBaseSchema = {
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  categoryId: z.string().optional(),
  dueDate: z.string().optional(),
};

export const createTaskSchema = z.object({
  ...taskBaseSchema,
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: taskBaseSchema.title.optional(),
  description: taskBaseSchema.description.optional(),
  status: z.enum(["pending", "in_progress", "completed", "archived"]).optional(),
  priority: taskBaseSchema.priority.optional(),
  categoryId: taskBaseSchema.categoryId.optional(),
  dueDate: taskBaseSchema.dueDate.optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

// Task filter schema
export const taskFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed", "archived"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  categoryId: z.string().optional(),
});

export type TaskFilterSchema = z.infer<typeof taskFilterSchema>;
