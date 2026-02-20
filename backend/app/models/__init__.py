"""Models module initialization."""

from sqlmodel import SQLModel

from app.models.user import User
from app.models.task import Task
from app.models.category import Category
from app.models.conversation import Conversation
from app.models.message import Message, MessageRole

# Export Base for use in database initialization
Base = SQLModel

__all__ = ["User", "Task", "Category", "Conversation", "Message", "MessageRole", "Base"]
