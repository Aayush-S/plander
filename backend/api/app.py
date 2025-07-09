from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import db, models
from .logic import room as room_logic, activity as activity_logic

app = FastAPI(title="Plander API")

@app.on_event("startup")
def startup_event():
    db.init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Plander API"}

# Room Endpoints
@app.post("/rooms/", response_model=models.Room)
def create_room(room: models.Room, db_session: Session = Depends(db.get_db)):
    try:
        return room_logic.create_room(db_session, room)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/rooms/", response_model=List[models.Room])
def get_rooms(db_session: Session = Depends(db.get_db)):
    return room_logic.get_all_rooms(db_session)

@app.get("/rooms/code/{code}", response_model=models.Room)
def get_room_by_code(code: str, db_session: Session = Depends(db.get_db)):
    db_room = room_logic.get_room_by_code(db_session, code)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.get("/rooms/{room_id}", response_model=models.Room)
def get_room(room_id: str, db_session: Session = Depends(db.get_db)):
    db_room = room_logic.get_room(db_session, room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.delete("/rooms/{room_id}", response_model=models.Room)
def delete_room(room_id: str, db_session: Session = Depends(db.get_db)):
    db_room = room_logic.delete_room(db_session, room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

# Activity Endpoints
@app.post("/activities/{room_code}/create", response_model=models.Activity)
def create_activity(room_code: str, activity: models.Activity, db_session: Session = Depends(db.get_db)):
    try:
        return activity_logic.create_activity(db_session, room_code, activity)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/activities/", response_model=List[models.Activity])
def get_activities(db_session: Session = Depends(db.get_db)):
    return activity_logic.get_all_activities(db_session)