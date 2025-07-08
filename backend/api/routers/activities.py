from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import Activity, ActivityCreate
from ..services.activity_service import ActivityService
from ..repositories.activity_repository import ActivityRepository
from ..repositories.room_repository import RoomRepository
from typing import List

router = APIRouter(
    prefix="/activities",
    tags=["activities"]
)

def get_activity_service(db: Session = Depends(get_db)) -> ActivityService:
    activity_repository = ActivityRepository(db)
    room_repository = RoomRepository(db)
    return ActivityService(activity_repository, room_repository)

@router.get("/", response_model=List[Activity])
async def get_activities(service: ActivityService = Depends(get_activity_service)):
    """
    Get all available activities.
    """
    return service.get_all_activities()

@router.post("/{room_code}/create", response_model=Activity)
async def create_activity(room_code: str, activity: ActivityCreate, service: ActivityService = Depends(get_activity_service)):
    """
    Create a new activity.
    """
    try:
        return service.create_activity(room_code, activity)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# @router.get("/code/{code}", response_model=Room)
# async def get_room_by_code(code: str, service: RoomService = Depends(get_room_service)):
#     """
#     Get a specific room by code.
#     """
#     room = service.get_room_by_code(code)
#     if not room:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return room

# @router.get("/{room_id}", response_model=Room)
# async def get_room(room_id: str, service: RoomService = Depends(get_room_service)):
#     """
#     Get a specific room by ID.
#     """
#     room = service.get_room(room_id)
#     if not room:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return room

# @router.post("/", response_model=Room)
# async def create_room(room: RoomCreate, service: RoomService = Depends(get_room_service)):
#     """
#     Create a new room.
#     """
#     return service.create_room(
#         name=room.name,
#         destination=room.destination,
#         created_by=room.created_by
#     )

# @router.delete("/{room_id}", response_model=Room)
# async def delete_room(room_id: str, service: RoomService = Depends(get_room_service)):
#     """
#     Delete a room by ID.
#     """
#     room = service.delete_room(room_id)
#     if not room:
#         raise HTTPException(status_code=404, detail="Room not found")
#     return room 