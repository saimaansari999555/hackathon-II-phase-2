"""Database dependencies for session management and connection lifecycle."""

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker, scoped_session

from app.config import settings

# Create database engine
# Note: pool_size and max_overflow are only used for pooled connections (PostgreSQL, MySQL)
# SQLite doesn't support connection pooling, so we conditionally set these parameters
engine_kwargs = {
    "echo": settings.DEBUG,
    "pool_pre_ping": True,
}

# Only add pool settings for non-SQLite databases
if not settings.DATABASE_URL.startswith("sqlite://"):
    engine_kwargs["pool_size"] = 5
    engine_kwargs["max_overflow"] = 10

engine = create_engine(settings.DATABASE_URL, **engine_kwargs)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create scoped session for thread safety
Session = scoped_session(SessionLocal)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency that provides a database session.

    This function is used as a FastAPI dependency to ensure each
    request gets its own database session that is properly closed
    after the request completes.

    Yields:
        Session: SQLAlchemy database session.

    Example:
        @router.get("/tasks")
        def list_tasks(db: Session = Depends(get_db)):
            return db.query(Task).all()
    """
    db = Session()
    try:
        yield db
    finally:
        db.close()
        Session.remove()


def init_db() -> None:
    """Initialize database tables.

    Creates all tables defined in SQLModel metadata.
    This should be called during application startup.
    """
    from app.models import Base
    Base.metadata.create_all(bind=engine)
