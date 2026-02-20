"""Task model definition with ownership and relationships."""

from datetime import date, datetime
from enum import Enum
from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4

from sqlalchemy import Column, Date, DateTime, Text, String
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.category import Category


class TaskStatus(str, Enum):
    """Task status enumeration."""

    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class TaskPriority(str, Enum):
    """Task priority enumeration."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Task(SQLModel, table=True):
    """Task model representing a todo item.

    Attributes:
        id: Unique task identifier (UUID).
        user_id: Owning user's UUID (foreign key).
        category_id: Optional category UUID (foreign key).
        title: Task title (required).
        description: Optional task description.
        status: Task status (default: pending).
        priority: Task priority (default: medium).
        due_date: Optional due date.
        completed_at: Timestamp when task was completed.
        created_at: Timestamp when task was created.
        updated_at: Timestamp when task was last updated.
    """

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    category_id: Optional[UUID] = Field(
        default=None,
        foreign_key="category.id",
        index=True,
    )
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None, sa_column=Column(Text))
    status: str = Field(
        default=TaskStatus.PENDING.value,
        max_length=20,
        schema_extra={"enum": [s.value for s in TaskStatus]},
    )
    priority: str = Field(
        default=TaskPriority.MEDIUM.value,
        max_length=10,
        schema_extra={"enum": [p.value for p in TaskPriority]},
    )
    due_date: Optional[date] = Field(default=None, sa_column=Column(Date))
    completed_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime))
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(timezone=False), default=datetime.utcnow),
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(timezone=False), default=datetime.utcnow),
    )

    # Relationships
    user: "User" = Relationship(back_populates="tasks")
    category: "Category" = Relationship(back_populates="tasks")

    def __repr__(self) -> str:
        """String representation of the task."""
        return f"<Task(id={self.id}, title={self.title[:20]}...)>"

    def complete(self) -> None:
        """Mark task as completed."""
        self.status = TaskStatus.COMPLETED.value
        self.completed_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()
