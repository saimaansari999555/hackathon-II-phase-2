"""User service implementing user management with database persistence.
"""
import logging
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.user import User

logger = logging.getLogger(__name__)

class UserService:
    """Service class for user operations with database persistence."""
    
    def __init__(self, db: Session):
        """Initialize the user service.
        
        Args:
            db: SQLAlchemy database session.
        """
        self.db = db
    
    def create(self, user_id: UUID, email: str, hashed_password: str) -> User:
        """
        Create a new user in the database.
        
        Args:
            user_id: The user's UUID.
            email: The user's email address.
            hashed_password: The user's hashed password.
            
        Returns:
            Created User instance.
        """
        user = User(
            id=user_id,
            email=email,
            hashed_password=hashed_password,
        )
        
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        
        logger.info(f"User {user_id} created in database with email {email}")
        return user
    
    def get_by_email(self, email: str) -> User | None:
        """
        Get a user by email.
        
        Args:
            email: The user's email address.
            
        Returns:
            User if found, None otherwise.
        """
        result = self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    def get_by_id(self, user_id: UUID) -> User | None:
        """
        Get a user by ID.
        
        Args:
            user_id: The user's UUID.
            
        Returns:
            User if found, None otherwise.
        """
        result = self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()