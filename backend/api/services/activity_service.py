import random
import string
from ..repositories.activity_repository import ActivityRepository
from ..repositories.room_repository import RoomRepository
from ..db import Activity
from datetime import datetime, timezone
import uuid

class ActivityService:
    def __init__(self, activity_repository: ActivityRepository, room_repository: RoomRepository):
        self.activity_repository = activity_repository
        self.room_repository = room_repository

    def get_all_activities(self):
        return self.activity_repository.get_all()

    def get_activity(self, activity_id: str):
        return self.activity_repository.get_by_id(activity_id)

    def create_activity(self, room_code: str, activity_data):
        room = self.room_repository.get_by_code(room_code)
        if not room:
            raise ValueError("Room not found")

        # Create new Activity instance
        activity = Activity()
        activity.id = str(uuid.uuid4())
        activity.emoji = activity_data.emoji
        activity.title = activity_data.title
        activity.description = activity_data.description
        activity.submitted_by = "anonymous"  # TODO: Get from auth context
        activity.votes = []  # Initialize empty votes list
        activity.room_id = room.id
        activity.created_at = datetime.now(timezone.utc)
        
        return self.activity_repository.create(activity)

    def delete_activity(self, activity_id: str):
        return self.activity_repository.delete(activity_id)
