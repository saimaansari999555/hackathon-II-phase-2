from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.message import Message, MessageRole


class MessageRepository:
    """Repository for Message data access."""

    @staticmethod
    def create_message(
        db: Session,
        conversation_id: int,
        user_id: UUID,
        role: str,
        content: str
    ) -> Message:
        """Create a new message in a conversation."""
        message = Message(
            conversation_id=conversation_id,
            user_id=user_id,
            role=role,
            content=content
        )
        db.add(message)
        db.commit()
        db.refresh(message)
        return message

    @staticmethod
    def get_messages_for_conversation(
        db: Session,
        conversation_id: int
    ) -> List[Message]:
        """Get all messages for a specific conversation, ordered by creation time."""
        return (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )

    @staticmethod
    def list_messages_for_user(
        db: Session,
        user_id: UUID
    ) -> List[Message]:
        """List all messages belonging to a user across all conversations."""
        return (
            db.query(Message)
            .filter(Message.user_id == user_id)
            .order_by(Message.created_at.asc())
            .all()
        )
