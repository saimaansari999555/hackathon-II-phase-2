from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Column, DateTime, Text, Index
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.conversation import Conversation


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Message(SQLModel, table=True):
    """Message model representing a single exchange in a chat session."""

    __tablename__ = "message"
    __table_args__ = (
        Index("idx_message_conversation_created", "conversation_id", "created_at"),
    )

    id: int | None = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id", index=True)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    role: str = Field(index=True)  # user or assistant
    content: str = Field(sa_column=Column(Text))
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(timezone=False), default=datetime.utcnow),
    )

    # Relationships
    conversation: "Conversation" = Relationship(back_populates="messages")

    def __repr__(self) -> str:
        return f"<Message(id={self.id}, role={self.role}, conversation_id={self.conversation_id})>"
