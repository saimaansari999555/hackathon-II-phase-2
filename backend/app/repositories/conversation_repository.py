from typing import List, Optional
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.conversation import Conversation


class ConversationRepository:
    """Repository for Conversation data access."""

    @staticmethod
    def create_conversation(db: Session, user_id: UUID) -> Conversation:
        """Create a new conversation session for a user."""
        conversation = Conversation(user_id=user_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation

    @staticmethod
    def get_conversation(
        db: Session,
        conversation_id: int,
        user_id: UUID
    ) -> Optional[Conversation]:
        """Get a conversation by ID, verifying it belongs to the user."""
        return (
            db.query(Conversation)
            .filter(Conversation.id == conversation_id, Conversation.user_id == user_id)
            .first()
        )

    @staticmethod
    def list_conversations(
        db: Session,
        user_id: UUID,
        limit: int = 10,
        offset: int = 0
    ) -> List[Conversation]:
        """List user's conversations, ordered by most recently updated."""
        return (
            db.query(Conversation)
            .filter(Conversation.user_id == user_id)
            .order_by(Conversation.updated_at.desc())
            .limit(limit)
            .offset(offset)
            .all()
        )

    @staticmethod
    def update_timestamp(db: Session, conversation_id: int):
        """Update the updated_at timestamp of a conversation."""
        conversation = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if conversation:
            conversation.updated_at = datetime.utcnow()
            db.add(conversation)
            db.commit()
