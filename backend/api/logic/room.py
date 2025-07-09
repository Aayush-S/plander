from sqlalchemy.orm import Session
import random
import string
import uuid
from datetime import datetime, timezone
from .. import models, db

def get_all_rooms(db_session: Session):
    return db_session.query(db.Room).all()

def get_room(db_session: Session, room_id: str):
    return db_session.query(db.Room).filter(db.Room.id == room_id).first()

def get_room_by_code(db_session: Session, code: str):
    return db_session.query(db.Room).filter(db.Room.code.ilike(code)).one_or_none()

def create_room(db_session: Session, room: models.Room, max_retries: int = 10):
    for _ in range(max_retries):
        code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if not get_room_by_code(db_session, code):
            break
    else:
        raise ValueError("Failed to generate a unique code after max retries")

    room_db = db.Room(
        id=str(uuid.uuid4()),
        code=code,
        name=room.name,
        destination=room.destination,
        created_by=room.created_by,
        created_at=datetime.now(timezone.utc)
    )
    db_session.add(room_db)
    db_session.commit()
    db_session.refresh(room_db)
    return room_db

def delete_room(db_session: Session, room_id: str):
    room = get_room(db_session, room_id)
    if room:
        db_session.delete(room)
        db_session.commit()
    return room 