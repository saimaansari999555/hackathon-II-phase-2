"""Task service implementing business logic with ownership enforcement.

This service handles all task-related operations with automatic
user ownership filtering on every query.
"""

import logging
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.task import Task, TaskStatus
from app.schemas.task_schema import TaskCreate, TaskUpdate

logger = logging.getLogger(__name__)


class TaskService:
    """Service class for task operations with ownership enforcement.

    All operations automatically filter by user_id to ensure
    users can only access their own tasks.
    """

    def __init__(self, db: Session, user_id: UUID):
        """Initialize the task service.

        Args:
            db: SQLAlchemy database session.
            user_id: The authenticated user's ID for ownership filtering.
        """
        self.db = db
        self.user_id = user_id

    def get(self, task_id: UUID) -> Task | None:
        """
        Get a task by ID with ownership check.

        Args:
            task_id: The task UUID to retrieve.

        Returns:
            Task if found and owned by user, None otherwise.
        """
        result = self.db.execute(
            select(Task).where(
                Task.id == task_id,
                Task.user_id == self.user_id,
            )
        )
        task = result.scalar_one_or_none()
        if task:
            logger.info(f"Task {task_id} retrieved for user {self.user_id}")
        return task

    def list(
        self,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        category_id: Optional[UUID] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> dict:
        """
        List tasks with optional filtering and pagination.

        Args:
            status: Filter by task status.
            priority: Filter by priority level.
            category_id: Filter by category UUID.
            limit: Maximum number of results.
            offset: Number of results to skip.

        Returns:
            dict with items, total, limit, and offset.
        """
        # Build base query with ownership filter
        base_query = select(Task).where(Task.user_id == self.user_id)

        # Apply optional filters
        if status:
            base_query = base_query.where(Task.status == status)

        if priority:
            base_query = base_query.where(Task.priority == priority)

        if category_id:
            base_query = base_query.where(Task.category_id == category_id)

        # Get total count
        count_query = select(func.count()).select_from(base_query.subquery())
        total = self.db.execute(count_query).scalar() or 0

        # Apply ordering and pagination
        query = (
            base_query
            .order_by(Task.created_at.desc())
            .offset(offset)
            .limit(limit)
        )

        tasks = list(self.db.execute(query).scalars().all())

        logger.info(
            f"Listed {len(tasks)} tasks for user {self.user_id} "
            f"(total: {total}, offset: {offset}, limit: {limit})"
        )

        return {
            "tasks": tasks,
            "total": total,
            "limit": limit,
            "offset": offset,
        }

    def create(self, task_data: TaskCreate) -> Task:
        """
        Create a new task with automatic user_id assignment.

        Args:
            task_data: Task creation data.

        Returns:
            Created Task instance.
        """
        task = Task(
            user_id=self.user_id,
            title=task_data.title,
            description=task_data.description,
            priority=task_data.priority.value if hasattr(task_data.priority, 'value') else task_data.priority,
            category_id=task_data.category_id,
            due_date=task_data.due_date,
            status=task_data.status.value if hasattr(task_data.status, 'value') else task_data.status,
        )

        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)

        logger.info(f"Task {task.id} created for user {self.user_id}")
        return task

    def update(self, task_id: UUID, task_data: TaskUpdate) -> Task | None:
        """
        Update a task with ownership check.

        Args:
            task_id: The task UUID to update.
            task_data: Update data (only provided fields are updated).

        Returns:
            Updated Task if found and owned, None otherwise.
        """
        task = self.get(task_id)
        if not task:
            return None

        # Update only provided fields
        update_data = task_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            # Handle enum values
            if hasattr(value, 'value'):
                value = value.value
            setattr(task, field, value)

        task.updated_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(task)

        logger.info(f"Task {task_id} updated for user {self.user_id}")
        return task

    def delete(self, task_id: UUID) -> bool:
        """
        Delete a task with ownership check.

        Args:
            task_id: The task UUID to delete.

        Returns:
            True if task was deleted, False if not found or not owned.
        """
        task = self.get(task_id)
        if not task:
            return False

        self.db.delete(task)
        self.db.commit()

        logger.info(f"Task {task_id} deleted for user {self.user_id}")
        return True

    def complete(self, task_id: UUID) -> Task | None:
        """
        Mark a task as complete with ownership check.

        Args:
            task_id: The task UUID to complete.

        Returns:
            Updated Task if found and owned, None otherwise.
        """
        task = self.get(task_id)
        if not task:
            return None

        task.complete()
        self.db.commit()
        self.db.refresh(task)

        logger.info(f"Task {task_id} marked complete for user {self.user_id}")
        return task
