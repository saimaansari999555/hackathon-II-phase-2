# Hugging Face Spaces Deployment Guide

This guide explains how to deploy the Todo Backend application on Hugging Face Spaces using Docker.

## Prerequisites

- A Hugging Face account
- Basic understanding of Docker and FastAPI
- Repository pushed to Hugging Face Hub

## Deployment Steps

### 1. Create a Hugging Face Space

1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. Choose a name for your Space
3. Select "Docker" as the SDK
4. Choose "Public" or "Private" as needed
5. Click "Create Space"

### 2. Add Your Code

Push your code to the Space repository:

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
cd YOUR_SPACE_NAME
# Copy your todo-backend files here
git add .
git commit -m "Initial deployment"
git push origin main
```

### 3. Configure Secrets (Important!)

In your Space settings, add the following secrets:

- `SECRET_KEY`: A strong secret key for JWT authentication (minimum 32 characters)

Example:
```
SECRET_KEY=your-very-secure-random-string-of-at-least-32-characters-here
```

### 4. Wait for Build

The Space will automatically build using the Dockerfile. Monitor the build logs to ensure everything runs correctly.

## Configuration Details

### Port Configuration
- The application listens on port 7860 (default for Hugging Face Spaces)
- The `API_PORT` environment variable is handled gracefully if empty or invalid

### Database Configuration
- Uses Neon Database by default (PostgreSQL-compatible)
- Can be overridden with a custom `DATABASE_URL` secret if needed

### Security
- JWT authentication with configurable secret key
- Rate limiting to prevent abuse
- CORS configured for common origins

## Troubleshooting

### Common Issues

1. **Port Error**: Ensure `API_PORT` is not set or is set to a valid integer
2. **Database Issues**: The default NeonDB setup should work. Ensure the URL is valid.
3. **Authentication**: Make sure to set the `SECRET_KEY` in Space secrets

### Logs
Check the Space logs in the "Logs" tab to troubleshoot any issues.

## Scaling Considerations

Note that Hugging Face Spaces have limitations:
- Limited compute resources
- Applications may sleep when inactive
- No persistent storage (except `/tmp` directory during runtime)
- For production use, consider deploying elsewhere

## Updating the Application

To update your application:
1. Make changes to your local repository
2. Commit and push to the main branch
3. The Space will rebuild automatically

## Environment Variables

The application recognizes these environment variables:

- `PORT` - Main port (set by Hugging Face, defaults to 7860)
- `API_PORT` - API port (will use PORT value or default to 7860 if invalid)
- `DATABASE_URL` - Database connection string (defaults to NeonDB)
- `SECRET_KEY` - JWT secret key (should be set as a secret)
- `DEBUG` - Enable debug mode (defaults to False)