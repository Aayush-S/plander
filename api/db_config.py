import os
from sqlalchemy import create_engine, Column, String, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Global variables for engine and session
engine = None
SessionLocal = None

# Base class for models
Base = declarative_base()

def get_engine():
    """Get or create the database engine"""
    global engine
    if engine is None:
        if not DATABASE_URL:
            raise ValueError("DATABASE_URL environment variable is required")
        engine = create_engine(DATABASE_URL, echo=False)
    return engine

def get_session_local():
    """Get or create the session factory"""
    global SessionLocal
    if SessionLocal is None:
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=get_engine())
    return SessionLocal

# Room model
class Room(Base):
    __tablename__ = "rooms"
    
    id = Column(String, primary_key=True)
    code = Column(String, unique=True, index=True)
    name = Column(String)
    destination = Column(String)
    created_by = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    participants = Column(JSON, default=list)
    activities = Column(JSON, default=list)

# Activity model
class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(String, primary_key=True)
    room_code = Column(String, index=True)
    emoji = Column(String)
    title = Column(String)
    description = Column(Text)
    submitted_by = Column(String)
    votes = Column(JSON, default={"yes": [], "no": []})
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
def create_tables():
    """Create database tables"""
    Base.metadata.create_all(bind=get_engine())

# Get database session
def get_db():
    """Get a database session"""
    SessionLocal = get_session_local()
    db = SessionLocal()
    try:
        return db
    finally:
        pass  # Don't close here, let the caller handle it 