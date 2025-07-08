from sqlalchemy.orm import Session
from ..db import Activity

class ActivityRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Activity).all()

    def get_by_id(self, activity_id: str):
        return self.db.query(Activity).filter(Activity.id == activity_id).first()

    def create(self, activity: Activity):
        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)
        return activity

    def delete(self, activity_id: str):
        activity = self.get_by_id(activity_id)
        if activity:
            self.db.delete(activity)
            self.db.commit()
        return activity 