from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import Room, RoomCreate
from ..services.room_service import RoomService
from ..repositories.room_repository import RoomRepository
from typing import List

router = APIRouter(
    prefix="/rooms",
    tags=["rooms"]
)

def get_room_service(db: Session = Depends(get_db)) -> RoomService:
    repository = RoomRepository(db)
    return RoomService(repository)

@router.get("/", response_model=List[Room])
async def get_rooms(service: RoomService = Depends(get_room_service)):
    """
    Get all available rooms.
    Returns a list of rooms with their participants and activities.
    """
    return service.get_all_rooms()

@router.get("/code/{code}", response_model=Room)
async def get_room_by_code(code: str, service: RoomService = Depends(get_room_service)):
    """
    Get a specific room by code.
    """
    room = service.get_room_by_code(code)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.get("/{room_id}", response_model=Room)
async def get_room(room_id: str, service: RoomService = Depends(get_room_service)):
    """
    Get a specific room by ID.
    """
    room = service.get_room(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.post("/", response_model=Room)
async def create_room(room: RoomCreate, service: RoomService = Depends(get_room_service)):
    """
    Create a new room.
    """
    return service.create_room(
        name=room.name,
        destination=room.destination,
        created_by=room.created_by
    )

@router.delete("/{room_id}", response_model=Room)
async def delete_room(room_id: str, service: RoomService = Depends(get_room_service)):
    """
    Delete a room by ID.
    """
    room = service.delete_room(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room 