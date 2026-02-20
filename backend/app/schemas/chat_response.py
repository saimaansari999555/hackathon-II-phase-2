from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ToolCall(BaseModel):
    """Schema for a tool call made by the agent."""

    id: str
    name: str
    input: Dict[str, Any]
    status: str  # completed, failed
    result: Optional[Dict[str, Any]] = None


class ChatResponse(BaseModel):
    """Schema for chat endpoint response."""

    conversation_id: int
    response: str
    tool_calls: Optional[List[ToolCall]] = None
