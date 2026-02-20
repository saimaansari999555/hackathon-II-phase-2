"""Category Pydantic schemas for request/response validation."""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.category import Category


class CategoryBase(BaseModel):
    """Base category schema with common fields."""

    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    """Schema for creating a new category."""

    pass


class CategoryUpdate(BaseModel):
    """Schema for updating a category.

    All fields are optional - only provided fields will be updated.
    """

    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None


class CategoryResponse(CategoryBase):
    """Schema for category data in responses."""

    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    task_count: int = 0

    model_config = ConfigDict(from_attributes=True)


class CategoryListResponse(BaseModel):
    """Schema for paginated category list responses."""

    items: list[CategoryResponse]
    total: int
    limit: int
    offset: int
