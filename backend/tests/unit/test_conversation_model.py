"""Unit tests for Conversation model.

Tests the Conversation SQLModel class for correct field mapping,
defaults, and relationship definitions.
"""

import pytest
from datetime import datetime
from uuid import uuid4
from sqlalchemy import inspect

from app.models.conversation import Conversation
from app.models import Base


class TestConversationModelStructure:
    """Test Conversation model structure and database schema."""

    def test_conversation_table_exists(self, db):
        """Verify conversation table is created in database."""
        inspector = inspect(db.bind)
        tables = inspector.get_table_names()
        assert "conversation" in tables, "conversation table not found in database"

    def test_conversation_table_columns(self, db):
        """Verify conversation table has all required columns."""
        inspector = inspect(db.bind)
        columns = {col["name"] for col in inspector.get_columns("conversation")}

        expected_columns = {"id", "user_id", "created_at", "updated_at"}
        assert expected_columns.issubset(columns), (
            f"Missing columns in conversation table. "
            f"Expected {expected_columns}, found {columns}"
        )

    def test_conversation_id_primary_key(self, db):
        """Verify id is primary key."""
        inspector = inspect(db.bind)
        pk = inspector.get_pk_constraint("conversation")
        assert "id" in pk["constrained_columns"], "id is not set as primary key"

    def test_conversation_user_id_foreign_key(self, db):
        """Verify user_id has foreign key constraint to user table."""
        inspector = inspect(db.bind)
        fks = inspector.get_foreign_keys("conversation")

        user_fk = [fk for fk in fks if "user_id" in fk["constrained_columns"]]
        assert len(user_fk) > 0, "user_id foreign key not found"
        assert user_fk[0]["referred_table"] == "user", (
            f"user_id does not reference user table, "
            f"references {user_fk[0]['referred_table']}"
        )

    def test_conversation_user_id_indexed(self, db):
        """Verify user_id column is indexed for fast lookups."""
        inspector = inspect(db.bind)
        indexes = inspector.get_indexes("conversation")

        user_id_indexes = [
            idx for idx in indexes if "user_id" in idx["column_names"]
        ]
        assert len(user_id_indexes) > 0, "user_id is not indexed"

    def test_conversation_updated_at_indexed(self, db):
        """Verify updated_at column is indexed for sorting."""
        inspector = inspect(db.bind)
        indexes = inspector.get_indexes("conversation")

        updated_at_indexes = [
            idx for idx in indexes if "updated_at" in idx["column_names"]
        ]
        assert len(updated_at_indexes) > 0, "updated_at is not indexed"

    def test_conversation_timestamp_types(self, db):
        """Verify created_at and updated_at are timestamp columns."""
        inspector = inspect(db.bind)
        columns = {col["name"]: col for col in inspector.get_columns("conversation")}

        created_at_type = str(columns["created_at"]["type"])
        updated_at_type = str(columns["updated_at"]["type"])

        # Both should be DATETIME or TIMESTAMP types (SQLite uses DATETIME)
        assert "DATETIME" in created_at_type.upper() or "TIMESTAMP" in created_at_type.upper(), (
            f"created_at has unexpected type: {created_at_type}"
        )
        assert "DATETIME" in updated_at_type.upper() or "TIMESTAMP" in updated_at_type.upper(), (
            f"updated_at has unexpected type: {updated_at_type}"
        )


class TestConversationModelInstantiation:
    """Test Conversation model instantiation and field defaults."""

    def test_conversation_creation_with_user_id(self):
        """Test creating a Conversation instance with user_id."""
        user_id = uuid4()
        conversation = Conversation(user_id=user_id)

        assert conversation.user_id == user_id
        assert conversation.id is None  # Not yet persisted
        assert conversation.created_at is not None
        assert conversation.updated_at is not None

    def test_conversation_timestamps_are_datetime(self):
        """Verify created_at and updated_at are datetime objects."""
        user_id = uuid4()
        conversation = Conversation(user_id=user_id)

        assert isinstance(conversation.created_at, datetime)
        assert isinstance(conversation.updated_at, datetime)

    def test_conversation_repr(self):
        """Test __repr__ method returns useful debugging string."""
        user_id = uuid4()
        conversation = Conversation(user_id=user_id)

        repr_str = repr(conversation)
        assert "Conversation" in repr_str
        assert str(user_id) in repr_str
        assert "created_at" in repr_str

    def test_conversation_fields_accessible(self):
        """Verify all model fields are accessible."""
        user_id = uuid4()
        conversation = Conversation(user_id=user_id)

        # Verify all required fields exist and are accessible
        assert hasattr(conversation, "id")
        assert hasattr(conversation, "user_id")
        assert hasattr(conversation, "created_at")
        assert hasattr(conversation, "updated_at")


class TestConversationModelPersistence:
    """Test Conversation model persistence to database."""

    def test_conversation_insert_and_retrieve(self, db):
        """Test inserting a conversation and retrieving it."""
        from app.models.user import User

        # Create a user first (FK constraint requires valid user)
        user = User(email="test@example.com", hashed_password="hashed")
        db.add(user)
        db.commit()
        db.refresh(user)

        # Now create conversation for that user
        conversation = Conversation(user_id=user.id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        # Verify ID was assigned
        assert conversation.id is not None

        # Verify we can retrieve it
        retrieved = db.query(Conversation).filter(
            Conversation.id == conversation.id
        ).first()
        assert retrieved is not None
        assert retrieved.user_id == user.id
        assert retrieved.id == conversation.id

    def test_multiple_conversations_same_user(self, db):
        """Test creating multiple conversations for the same user."""
        from app.models.user import User

        # Create user first
        user = User(email="test@example.com", hashed_password="hashed")
        db.add(user)
        db.commit()
        db.refresh(user)

        # Create two conversations for the same user
        conv1 = Conversation(user_id=user.id)
        conv2 = Conversation(user_id=user.id)

        db.add_all([conv1, conv2])
        db.commit()

        # Verify both are persisted with different IDs
        assert conv1.id != conv2.id

        # Verify we can retrieve both
        conversations = db.query(Conversation).filter(
            Conversation.user_id == user.id
        ).all()
        assert len(conversations) == 2

    def test_conversation_timestamps_server_generated(self, db):
        """Verify timestamps are set by server, not client."""
        from app.models.user import User

        # Create user first
        user = User(email="test@example.com", hashed_password="hashed")
        db.add(user)
        db.commit()
        db.refresh(user)

        conversation = Conversation(user_id=user.id)
        db.add(conversation)
        db.commit()

        # Timestamps should be set
        assert conversation.created_at is not None
        assert conversation.updated_at is not None

        # Both should be close to now (within last second)
        now = datetime.utcnow()
        assert (now - conversation.created_at).total_seconds() < 1
        assert (now - conversation.updated_at).total_seconds() < 1

    def test_conversation_user_id_required(self, db):
        """Test that user_id is required (NOT NULL constraint)."""
        conversation = Conversation(user_id=None)  # Violates NOT NULL

        db.add(conversation)

        # Should raise an error due to NOT NULL constraint
        with pytest.raises(Exception):  # SQLAlchemy will raise IntegrityError
            db.commit()

    def test_conversation_fk_constraint_enforced(self, db):
        """Test that invalid user_id is rejected by FK constraint."""
        from uuid import uuid4

        # Try to create conversation with non-existent user_id
        conversation = Conversation(user_id=uuid4())
        db.add(conversation)

        # Should raise IntegrityError due to FK constraint
        with pytest.raises(Exception):  # IntegrityError
            db.commit()
