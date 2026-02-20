"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getSession } from "@/lib/auth/hooks";

// ... existing interfaces ...

/**
 * User interface from JWT token payload
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

/**
 * Session interface representing authenticated state
 */
export interface Session {
  user: AuthUser;
  token: string;
  expiresAt?: number;
}

/**
 * Auth context type definition
 */
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that wraps the application
 * and provides authentication state and methods.
 *
 * Features:
 * - Automatic session restoration on mount
 * - Session persistence across page navigations
 * - Protected route handling
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Refresh session from server
  const refreshSession = useCallback(async () => {
    try {
      const session = await getSession();

      if (session) {
        // Adapt session user to AuthUser if needed, or assume match
        // hooks.ts getSession returns data.session which likely has user
        setUser(session.user);
      } else {
        setUser(null);
        const protectedRoutes = ['/dashboard', '/tasks', '/task', '/profile', '/calendar', '/categories'];
        if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
      setUser(null);
      const protectedRoutes = ['/dashboard', '/tasks', '/task', '/profile', '/calendar', '/categories'];
      if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Check session on mount
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const data = await apiLogin(email, password);

        if (data?.user) {
          setUser(data.user);
        } else {
          // Fallback if user is not in response, try refresh
          await refreshSession();
        }

        router.push("/tasks"); // Always redirect to /tasks on successful login
      } catch (error: any) {
        throw new Error(error.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
    [router, refreshSession]
  );

  // Register function
  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      setIsLoading(true);
      try {
        const data = await apiRegister(email, password, name);

        if (data?.user) {
          setUser(data.user);
        } else {
          await refreshSession();
        }

        router.push("/tasks");
      } catch (error: any) {
        throw new Error(error.message || "Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
    [router, refreshSession]
  );

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setUser(null);
      router.push("/"); // Redirect to landing page on logout
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if server call fails
      setUser(null);
      router.push("/"); // Redirect to landing page on logout
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication state and methods.
 * Must be used within an AuthProvider.
 *
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Hook to get only the current user.
 * Convenience wrapper around useAuth.
 */
export function useUser(): AuthUser | null {
  const { user } = useAuth();
  return user;
}

/**
 * Hook to check if user is authenticated.
 * Convenience wrapper around useAuth.
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook to get loading state.
 * Convenience wrapper around useAuth.
 */
export function useAuthLoading(): boolean {
  const { isLoading } = useAuth();
  return isLoading;
}
