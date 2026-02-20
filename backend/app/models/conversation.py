"""Conversation model definition.

This module defines the Conversation SQLModel for storing chat sessions.
Each conversation represents a single chat session for a user and can contain
multiple messages. Conversations are immutable after creation (except through
message additions).
"""

from datetime import datetime
from uuid import UUID
from typing import TYPE_CHECKING, List

from sqlalchemy import Column, DateTime, Index
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.message import Message


class Conversation(SQLModel, table=True):
    """Conversation model representing a single chat session.

    Attributes:
        id: Unique conversation identifier (auto-increment integer).
        user_id: Owner of the conversation (foreign key to user table).
        created_at: Timestamp when conversation was created (server-generated).
        updated_at: Timestamp when conversation was last updated (server-generated).
    """

    __tablename__ = "conversation"
    __table_args__ = (
        Index("idx_conversation_updated_at", "updated_at"),
    )

    id: int | None = Field(default=None, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(timezone=False), default=datetime.utcnow),
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(timezone=False), default=datetime.utcnow),
    )

    # Relationships
    messages: List["Message"] = Relationship(back_populates="conversation")

    def __repr__(self) -> str:
        """String representation of the conversation."""
        return f"<Conversation(id={self.id}, user_id={self.user_id}, created_at={self.created_at})>"
