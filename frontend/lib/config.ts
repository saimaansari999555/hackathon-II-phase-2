// Environment configuration type definitions
export interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  BETTER_AUTH_URL: string;
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
}

// Runtime environment access with type safety
export const getEnv = (): EnvConfig => ({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:8000/api/v1/auth",
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Todo App",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000"),
});

// Validate required environment variables at build time
export const validateEnv = (): void => {
  const requiredVars: (keyof EnvConfig)[] = [
    "BETTER_AUTH_URL",
    "NEXT_PUBLIC_APP_NAME",
  ];

  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}. ` +
        `Please add them to your .env.local file.`
    );
  }
};

// API configuration helper
export const getApiConfig = () => {
  const env = getEnv();
  return {
    baseURL: env.NEXT_PUBLIC_API_URL,
    authURL: env.BETTER_AUTH_URL,
    appName: env.NEXT_PUBLIC_APP_NAME,
    appURL: env.NEXT_PUBLIC_APP_URL,
  };
};
