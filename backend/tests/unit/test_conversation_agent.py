import pytest
from uuid import uuid4
from app.agents.conversation_agent import ConversationAgent
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
from sqlalchemy.orm import Session

def test_load_or_create_conversation_new(db: Session):
    user_id = uuid4()
    # No user in DB yet, but relationship might need it if we had FK constraints enforced in memory
    # conftest enables foreign keys, so we need a user
    user = User(id=user_id, email="test@example.com", hashed_password="pw")
    db.add(user)
    db.commit()
    
    conv, messages = ConversationAgent.load_or_create_conversation(db, user_id)
    
    assert conv is not None
    assert conv.user_id == user_id
    assert len(messages) == 0

def test_load_or_create_conversation_existing(db: Session):
    user_id = uuid4()
    user = User(id=user_id, email="test@example.com", hashed_password="pw")
    db.add(user)
    db.commit()
    
    conv = Conversation(user_id=user_id)
    db.add(conv)
    db.commit()
    db.refresh(conv)
    
    # Add a message
    msg = Message(conversation_id=conv.id, user_id=user_id, role="user", content="hello")
    db.add(msg)
    db.commit()
    
    loaded_conv, messages = ConversationAgent.load_or_create_conversation(db, user_id, conv.id)
    
    assert loaded_conv.id == conv.id
    assert len(messages) == 1
    assert messages[0].content == "hello"

def test_load_or_create_conversation_wrong_user(db: Session):
    user_a_id = uuid4()
    user_b_id = uuid4()
    db.add(User(id=user_a_id, email="a@example.com", hashed_password="pw"))
    db.add(User(id=user_b_id, email="b@example.com", hashed_password="pw"))
    db.commit()
    
    conv_a = Conversation(user_id=user_a_id)
    db.add(conv_a)
    db.commit()
    
    # User B tries to load User A's conversation
    loaded_conv, messages = ConversationAgent.load_or_create_conversation(db, user_b_id, conv_a.id)
    
    assert loaded_conv is None
    assert len(messages) == 0

def test_format_history_for_ai():
    messages = [
        Message(role="user", content="hi"),
        Message(role="assistant", content="hello")
    ]
    formatted = ConversationAgent.format_history_for_ai(messages)
    assert formatted == [
        {"role": "user", "content": "hi"},
        {"role": "assistant", "content": "hello"}
    ]
