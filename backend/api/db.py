from sqlalchemy import create_engine, Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL or "postgresql://")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    created_at = Column(DateTime)
    created_by = Column(String, nullable=False)
    activities = relationship("Activity", back_populates="room", cascade="all, delete-orphan")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key=True)
    emoji = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    submitted_by = Column(String, nullable=False)
    votes = Column(JSON, default=list)
    created_at = Column(DateTime)
    room_id = Column(String, ForeignKey("rooms.id", ondelete="CASCADE"))
    room = relationship("Room", back_populates="activities")

def init_db():
    Base.metadata.create_all(bind=engine) 