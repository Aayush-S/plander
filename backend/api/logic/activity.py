from sqlalchemy.orm import Session
import uuid
from datetime import datetime, timezone
from .. import models, db
from . import room as room_logic

def get_all_activities(db_session: Session):
    return db_session.query(db.Activity).all()

def get_activity(db_session: Session, activity_id: str):
    return db_session.query(db.Activity).filter(db.Activity.id == activity_id).first()

def create_activity(db_session: Session, room_code: str, activity: models.Activity):
    room = room_logic.get_room_by_code(db_session, room_code)
    if not room:
        raise ValueError("Room not found")

    activity_db = db.Activity(
        id=str(uuid.uuid4()),
        emoji=activity.emoji,
        title=activity.title,
        description=activity.description,
        submitted_by="anonymous",  # TODO: Get from auth context
        votes=[],  # Initialize empty votes list
        room_id=room.id,
        created_at=datetime.now(timezone.utc)
    )
    
    db_session.add(activity_db)
    db_session.commit()
    db_session.refresh(activity_db)
    return activity_db

def delete_activity(db_session: Session, activity_id: str):
    activity = get_activity(db_session, activity_id)
    if activity:
        db_session.delete(activity)
        db_session.commit()
    return activity 