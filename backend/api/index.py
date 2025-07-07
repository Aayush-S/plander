from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from .db import get_db, Room as DBRoom, init_db
from .models import Room
from typing import List

# Load environment variables
load_dotenv()

app = FastAPI()

# Initialize database tables on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Plander API"}

@app.get("/rooms", response_model=List[Room])
async def get_rooms(db: Session = Depends(get_db)):
    """
    Get all available rooms.
    Returns a list of rooms with their participants and activities.
    """
    rooms = db.query(DBRoom).all()

    return rooms