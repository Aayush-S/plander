from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict

class ParticipantBase(BaseModel):
    name: str

class ParticipantCreate(ParticipantBase):
    pass

class Participant(ParticipantBase):
    id: str
    joined_at: datetime
    room_id: str

    class Config:
        from_attributes = True

class ActivityBase(BaseModel):
    emoji: str
    title: str
    description: Optional[str] = None
    submitted_by: str

class ActivityCreate(ActivityBase):
    pass

class Activity(ActivityBase):
    id: str
    votes: Dict[str, List[str]]
    created_at: datetime
    room_id: str

    class Config:
        from_attributes = True

class RoomBase(BaseModel):
    name: str
    destination: str

class RoomCreate(RoomBase):
    created_by: str

class Room(RoomBase):
    id: str
    created_at: datetime
    created_by: str
    participants: List[Participant] = []
    activities: List[Activity] = []

    class Config:
        from_attributes = True 