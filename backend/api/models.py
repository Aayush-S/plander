from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict

class Participant(BaseModel):
    id: str
    name: str
    joined_at: datetime


class Vote(BaseModel):
    vote: bool
    voter: Participant


class ActivityCreate(BaseModel):
    emoji: str
    title: str
    description: Optional[str] = None


class Activity(BaseModel):
    id: str
    emoji: str
    title: str
    description: Optional[str] = None
    submitted_by: str
    votes: List[Vote]
    created_at: datetime


class RoomCreate(BaseModel):
    name: str
    destination: str
    created_by: str


class Room(BaseModel):
    id: str
    code: str
    name: str
    destination: str
    created_at: datetime
    created_by: str
    participants: List[Participant] = []
    activities: List[Activity] = []
