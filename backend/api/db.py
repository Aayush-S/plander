from sqlalchemy import create_engine, Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# Ensure we're using the correct dialect name for PostgreSQL
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL or "postgresql://")

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(String, nullable=False)

    # Relationships
    participants = relationship("Participant", back_populates="room", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="room", cascade="all, delete-orphan")

class Participant(Base):
    __tablename__ = "participants"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    joined_at = Column(DateTime, default=datetime.utcnow)
    room_id = Column(String, ForeignKey("rooms.id", ondelete="CASCADE"))

    # Relationships
    room = relationship("Room", back_populates="participants")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    emoji = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    submitted_by = Column(String, nullable=False)
    votes = Column(JSON, default=lambda: {"yes": [], "no": []})
    created_at = Column(DateTime, default=datetime.utcnow)
    room_id = Column(String, ForeignKey("rooms.id", ondelete="CASCADE"))

    # Relationships
    room = relationship("Room", back_populates="activities")

# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine) 