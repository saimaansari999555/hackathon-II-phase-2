"""Route aggregation module.

This module imports and aggregates all API routers for inclusion
in the main FastAPI application.
"""

from fastapi import APIRouter

# Import routers from submodules
from app.api.tasks import router as tasks_router
from app.api.categories import router as categories_router
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router

# Create main API router
api_router = APIRouter()

# Include auth router first (unauthenticated routes)
api_router.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])

# Include routers with versioned prefixes
api_router.include_router(tasks_router, prefix="/api/v1/tasks", tags=["Tasks"])
api_router.include_router(categories_router, prefix="/api/v1/categories", tags=["Categories"])

# Include chat router (AI endpoints)
api_router.include_router(chat_router, prefix="/api", tags=["Chat"])


