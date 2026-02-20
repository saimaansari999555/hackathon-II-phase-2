"""Categories API endpoints.

This module provides REST API endpoints for category CRUD operations.
All endpoints require authentication and enforce user ownership.
"""

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.auth import get_current_user
from app.dependencies.database import get_db
from app.core.exceptions import NotFoundException
from app.schemas.category_schema import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
    CategoryListResponse,
)
from app.services.category_service import CategoryService

router = APIRouter()


@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_data: CategoryCreate,
    user_id: UUID = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Create a new category for the authenticated user.

    Returns:
        CategoryResponse: The created category with generated ID and timestamps.
    """
    service = CategoryService(db, user_id)
    return service.create(category_data)


@router.get("/", response_model=CategoryListResponse)
async def list_categories(
    limit: int = 100,
    offset: int = 0,
    user_id: UUID = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    List categories for the authenticated user.

    Query Parameters:
        limit: Maximum number of results (default 100)
        offset: Number of results to skip (default 0)

    Returns:
        CategoryListResponse: Paginated list of categories.
    """
    service = CategoryService(db, user_id)
    return service.list(limit=limit, offset=offset)


@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(
    category_id: UUID,
    user_id: UUID = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get a specific category by ID.

    Returns 404 for non-existent or non-owned categories.

    Returns:
        CategoryResponse: The requested category.
    """
    service = CategoryService(db, user_id)
    category = service.get(category_id)
    if not category:
        raise NotFoundException(detail="Category not found")
    return category


@router.put("/{category_id}", response_model=CategoryResponse)
async def update_category(
    category_id: UUID,
    category_data: CategoryUpdate,
    user_id: UUID = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Update an existing category.

    Returns 404 for non-existent or non-owned categories.

    Returns:
        CategoryResponse: The updated category.
    """
    service = CategoryService(db, user_id)
    category = service.update(category_id, category_data)
    if not category:
        raise NotFoundException(detail="Category not found")
    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: UUID,
    user_id: UUID = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete a category.

    Returns 404 for non-existent or non-owned categories.

    Returns:
        204 No Content on successful deletion.
    """
    service = CategoryService(db, user_id)
    success = service.delete(category_id)
    if not success:
        raise NotFoundException(detail="Category not found")
    return None
