import { useState, useCallback } from "react";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Category } from "@/types/task";
import { useSession } from "@/lib/auth/provider";

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (name: string, color?: string) => Promise<Category>;
}

export function useCategories(): UseCategoriesReturn {
  const { isAuthenticated } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get(API_ENDPOINTS.CATEGORIES);
      // Backend returns { items: [], total: ... }, so we must extract items
      setCategories(data.items || []);
    } catch (err: any) {
      console.error("Failed to fetch categories:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const createCategory = useCallback(async (name: string, color?: string) => {
    setError(null);
    try {
      const { data } = await apiClient.post(API_ENDPOINTS.CATEGORIES, { name, color });
      setCategories((prev) => [...prev, data]);
      return data;
    } catch (err: any) {
      const message = err.message || "Failed to create category";
      setError(message);
      throw err;
    }
  }, []);

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
  };
}
