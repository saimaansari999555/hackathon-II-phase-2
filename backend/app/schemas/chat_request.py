from typing import Optional
from pydantic import BaseModel, Field, field_validator


class ChatRequest(BaseModel):
    """Schema for chat endpoint request."""

    conversation_id: Optional[int] = Field(
        default=None, description="Existing conversation ID to resume"
    )
    message: str = Field(..., description="User message content")

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()
