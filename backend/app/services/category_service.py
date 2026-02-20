"""Category service implementing business logic with ownership enforcement.

This service handles all category-related operations with automatic
user ownership filtering on every query.
"""

import logging
from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.models.category import Category
from app.schemas.category_schema import CategoryCreate, CategoryUpdate

logger = logging.getLogger(__name__)


class CategoryService:
    """Service class for category operations with ownership enforcement.

    All operations automatically filter by user_id to ensure
    users can only access their own categories.
    """

    def __init__(self, db: Session, user_id: UUID):
        """Initialize the category service.

        Args:
            db: SQLAlchemy database session.
            user_id: The authenticated user's ID for ownership filtering.
        """
        self.db = db
        self.user_id = user_id

    def get(self, category_id: UUID) -> Category | None:
        """
        Get a category by ID with ownership check.

        Args:
            category_id: The category UUID to retrieve.

        Returns:
            Category if found and owned by user, None otherwise.
        """
        result = self.db.execute(
            select(Category).where(
                Category.id == category_id,
                Category.user_id == self.user_id,
            )
        )
        category = result.scalar_one_or_none()
        if category:
            logger.info(
                f"Category {category_id} retrieved for user {self.user_id}"
            )
        return category

    def list(
        self,
        limit: int = 100,
        offset: int = 0,
    ) -> dict:
        """
        List categories with optional pagination.

        Args:
            limit: Maximum number of results.
            offset: Number of results to skip.

        Returns:
            dict with items, total, limit, and offset.
        """
        # Build base query with ownership filter
        base_query = select(Category).where(Category.user_id == self.user_id)

        # Get total count
        count_query = select(func.count()).select_from(base_query.subquery())
        total = self.db.execute(count_query).scalar() or 0

        # Apply ordering and pagination
        query = (
            base_query
            .order_by(Category.name.asc())
            .offset(offset)
            .limit(limit)
        )

        categories = list(self.db.execute(query).scalars().all())

        logger.info(
            f"Listed {len(categories)} categories for user {self.user_id} "
            f"(total: {total}, offset: {offset}, limit: {limit})"
        )

        return {
            "items": categories,
            "total": total,
            "limit": limit,
            "offset": offset,
        }

    def create(self, category_data: CategoryCreate) -> Category:
        """
        Create a new category with automatic user_id assignment.

        Args:
            category_data: Category creation data.

        Returns:
            Created Category instance.
        """
        category = Category(
            user_id=self.user_id,
            name=category_data.name,
            description=category_data.description,
        )

        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)

        logger.info(
            f"Category {category.id} created for user {self.user_id}"
        )
        return category

    def update(
        self,
        category_id: UUID,
        category_data: CategoryUpdate,
    ) -> Category | None:
        """
        Update a category with ownership check.

        Args:
            category_id: The category UUID to update.
            category_data: Update data (only provided fields are updated).

        Returns:
            Updated Category if found and owned, None otherwise.
        """
        category = self.get(category_id)
        if not category:
            return None

        # Update only provided fields
        update_data = category_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(category, field, value)

        category.updated_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(category)

        logger.info(
            f"Category {category_id} updated for user {self.user_id}"
        )
        return category

    def delete(self, category_id: UUID) -> bool:
        """
        Delete a category with ownership check.

        Args:
            category_id: The category UUID to delete.

        Returns:
            True if category was deleted, False if not found or not owned.
        """
        category = self.get(category_id)
        if not category:
            return False

        self.db.delete(category)
        self.db.commit()

        logger.info(
            f"Category {category_id} deleted for user {self.user_id}"
        )
        return True

    def get_task_count(self, category_id: UUID) -> int:
        """
        Get the number of tasks in a category.

        Args:
            category_id: The category UUID.

        Returns:
            Number of tasks in the category.
        """
        result = self.db.execute(
            select(func.count()).where(
                Category.id == category_id,
                Category.user_id == self.user_id,
            )
        )
        return result.scalar() or 0
