# Hugging Face Spaces Secrets Configuration

When deploying this Todo Backend application to Hugging Face Spaces, you should configure the following secrets in your Space settings:

## Required Secrets

1. **SECRET_KEY** - A strong secret key for JWT token generation (minimum 32 characters)
2. **DATABASE_URL** (optional) - Custom database URL if you want to use PostgreSQL instead of the default SQLite

## Recommended Values

- SECRET_KEY: Generate a strong random key (e.g., using `openssl rand -hex 32`)

## Default Behavior

If secrets are not provided:
- SECRET_KEY defaults to "your-jwt-secret-key-minimum-32-characters-long"
- DATABASE_URL defaults to Neon Database connection string

## Notes

- The application is configured to work with Hugging Face Spaces restrictions
- Uses SQLite database in the /tmp directory for persistence during runtime
- API runs on port 7860 (default for Hugging Face Spaces)