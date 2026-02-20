#!/bin/bash
# Startup script for Hugging Face Spaces

echo "Starting Todo Backend API..."

# Set default port if not provided
export PORT=${PORT:-7860}

# Run the application
exec uvicorn server:asgi_app --host 0.0.0.0 --port $PORT