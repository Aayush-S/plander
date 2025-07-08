from sqlalchemy.orm import Session
from ..db import Room

class RoomRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Room).all()

    def get_by_id(self, room_id: str):
        return self.db.query(Room).filter(Room.id == room_id).first()

    def get_by_code(self, code: str):
        return self.db.query(Room).filter(Room.code.ilike(code)).one_or_none()

    def create(self, room: Room):
        self.db.add(room)
        self.db.commit()
        self.db.refresh(room)
        return room

    def delete(self, room_id: str):
        room = self.get_by_id(room_id)
        if room:
            self.db.delete(room)
            self.db.commit()
        return room 