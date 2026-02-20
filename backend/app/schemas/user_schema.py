"""User Pydantic schemas for request/response validation."""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base user schema with common fields."""

    email: EmailStr


class UserCreate(UserBase):
    """Schema for creating a user.

    This schema is provided for future use when implementing
    user registration flows.
    """

    pass


class UserResponse(UserBase):
    """Schema for user data in responses."""

    id: UUID
    created_at: datetime

    class Config:
        """Pydantic configuration."""
        from_attributes = True
