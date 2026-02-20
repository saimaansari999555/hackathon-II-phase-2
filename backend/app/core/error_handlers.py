from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Union, Dict, Any, Optional


async def http_exception_handler(request: Request, exc: HTTPException):
    """Global handler for HTTPExceptions."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": f"HTTP_{exc.status_code}",
                "message": exc.detail,
                "type": "http_exception"
            }
        },
    )


async def generic_exception_handler(request: Request, exc: Exception):
    """Global catch-all for unhandled exceptions."""
    # Log the exception here in a real app
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred. Please try again later.",
                "type": "server_error"
            }
        },
    )


def create_error_response(
    status_code: int,
    code: str,
    message: str,
    details: Optional[Dict[str, Any]] = None
) -> JSONResponse:
    """Utility to create a structured error response."""
    content = {
        "error": {
            "code": code,
            "message": message,
            "type": "business_error"
        }
    }
    if details:
        content["error"]["details"] = details
        
    return JSONResponse(status_code=status_code, content=content)
