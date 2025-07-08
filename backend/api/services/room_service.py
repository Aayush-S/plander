import random
import string
from ..repositories.room_repository import RoomRepository
from ..db import Room
from datetime import datetime, timezone
import uuid

class RoomService:
    def __init__(self, repository: RoomRepository):
        self.repository = repository

    def get_all_rooms(self):
        return self.repository.get_all()

    def get_room(self, room_id: str):
        return self.repository.get_by_id(room_id)

    def get_room_by_code(self, code: str):
        return self.repository.get_by_code(code)

    def create_room(self, name: str, destination: str, created_by: str, max_retries: int = 10):

        for _ in range(max_retries):
            code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
            existing_room = self.repository.get_by_code(code)
            if not existing_room:
                break
        else:
            raise ValueError("Failed to generate a unique code after max retries")

        room = Room(
            id=str(uuid.uuid4()),
            code=code,
            name=name,
            destination=destination,
            created_by=created_by,
            created_at=datetime.now(timezone.utc)
        )
        return self.repository.create(room)

    def delete_room(self, room_id: str):
        return self.repository.delete(room_id)