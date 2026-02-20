"""
Hugging Face Spaces compatible entry point for the Todo Backend Application.

This file serves as the main entry point for deployment on Hugging Face Spaces.
"""

import os
from app.main import app
from app.config import settings

# Ensure the API_PORT is properly configured for Hugging Face Spaces
if os.getenv("PORT"):
    # Hugging Face Spaces sets the PORT environment variable
    port = int(os.getenv("PORT", 7860))
    settings.API_PORT = port
elif not os.getenv("API_PORT") or os.getenv("API_PORT") == "":
    # Set default port for Hugging Face if not provided
    settings.API_PORT = 7860

# Make the FastAPI app available as an ASGI callable
asgi_app = app

if __name__ == "__main__":
    import uvicorn
    # Use the port provided by Hugging Face Spaces or default to 7860
    port = int(os.getenv("PORT", settings.API_PORT))
    uvicorn.run(
        "server:asgi_app",
        host="0.0.0.0",
        port=port,
        reload=False,  # Disable reload in production
    )