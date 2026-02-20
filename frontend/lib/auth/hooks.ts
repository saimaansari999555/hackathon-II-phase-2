import apiClient from "@/lib/api/client";

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post('/api/v1/auth/login', {
      email,
      password,
    });
    
    if (typeof window !== 'undefined' && response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Set cookie for middleware
      document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
}

export async function register(email: string, password: string, name?: string) {
  try {
    // Only include name in the request if it's provided
    const requestData: any = {
      email,
      password,
    };
    
    if (name) {
      requestData.name = name;
    }
    
    const response = await apiClient.post('/api/v1/auth/register', requestData);
    
    // Store token in localStorage for use in interceptors
    if (typeof window !== 'undefined' && response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Set cookie for middleware
      document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
}

export async function logout() {
  try {
    await apiClient.post('/api/v1/auth/logout');
    // Clear token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // Clear cookie
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  } catch (error: any) {
    console.error("Logout error:", error);
    // Still clear local token even if server call fails
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}

export async function getSession() {
  // Don't make API calls during server-side rendering
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const response = await apiClient.get('/api/v1/auth/session');
    return response.data.session;
  } catch (error: any) {
    // Return null if unauthorized (session expired or not logged in)
    if (error.response?.status === 401) {
      // Only access localStorage if in browser environment
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      return null;
    }
    console.error("Session fetch error:", error);
    
    // Only access localStorage if in browser environment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}
