from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional

class Activity(BaseModel):
    id: Optional[str] = None
    emoji: str
    title: str
    description: Optional[str] = None
    submitted_by: Optional[str] = None
    votes: list = []
    created_at: Optional[datetime] = None
    room_id: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class Room(BaseModel):
    id: Optional[str] = None
    code: Optional[str] = None
    name: str
    destination: str
    created_at: Optional[datetime] = None
    created_by: str
    activities: List[Activity] = []
    model_config = ConfigDict(from_attributes=True)
