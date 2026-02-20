"""Task Pydantic schemas for request/response validation."""

from datetime import date, datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

# Import enums directly from sqlmodel for consistency
from sqlmodel import Enum

from app.models.task import TaskStatus, TaskPriority


class TaskBase(BaseModel):
    """Base task schema with common fields."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    priority: TaskPriority = TaskPriority.MEDIUM
    category_id: Optional[UUID] = None
    due_date: Optional[date] = None


class TaskCreate(TaskBase):
    """Schema for creating a new task."""

    model_config = ConfigDict(from_attributes=True)

    status: TaskStatus = TaskStatus.PENDING


class TaskUpdate(BaseModel):
    """Schema for updating a task.

    All fields are optional - only provided fields will be updated.
    """

    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    priority: Optional[TaskPriority] = None
    category_id: Optional[UUID] = None
    due_date: Optional[date] = None
    status: Optional[TaskStatus] = None

    model_config = ConfigDict(from_attributes=True)


class TaskResponse(TaskBase):
    """Schema for task data in responses."""

    id: UUID
    user_id: UUID
    status: TaskStatus
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    category_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class TaskListResponse(BaseModel):
    """Schema for paginated task list responses."""

    tasks: list[TaskResponse]
    total: int
    limit: int
    offset: int
