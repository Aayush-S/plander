from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
import os
import random
import string
from datetime import datetime
import uuid

# Add the api directory to the Python path so we can import db_config
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from db_config import get_db, Room, Activity, create_tables

app = Flask(__name__)
CORS(app)

# Health Check Endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

# Room Endpoints
@app.route('/api/rooms', methods=['POST'])
def create_room():
    """Handle room creation"""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON format"}), 400

    required_fields = ['name', 'destination', 'created_by']
    for field in required_fields:
        if field not in data or not data[field].strip():
            return jsonify({"error": f"Missing required field: {field}"}), 400

    db = get_db()
    try:
        room_code = generate_unique_room_code(db)
        new_room = Room(
            id=str(uuid.uuid4()),
            code=room_code,
            name=data['name'].strip(),
            destination=data['destination'].strip(),
            created_by=data['created_by'].strip(),
            created_at=datetime.utcnow(),
            participants=[],
            activities=[]
        )
        db.add(new_room)
        db.commit()

        room_data = {
            "id": new_room.id,
            "code": new_room.code,
            "name": new_room.name,
            "destination": new_room.destination,
            "created_by": new_room.created_by,
            "created_at": new_room.created_at.isoformat(),
            "participants": new_room.participants,
            "activities": new_room.activities
        }
        return jsonify(room_data), 201
    except Exception as e:
        db.rollback()
        print(f"Database error: {str(e)}")
        return jsonify({"error": "Failed to create room"}), 500
    finally:
        db.close()

@app.route('/api/rooms/<code>', methods=['GET'])
def get_room(code):
    """Handle room retrieval by code"""
    db = get_db()
    try:
        room = db.query(Room).filter(Room.code == code.upper()).first()
        if not room:
            return jsonify({"error": f"Room with code '{code}' not found"}), 404

        room_data = {
            "id": room.id,
            "code": room.code,
            "name": room.name,
            "destination": room.destination,
            "created_by": room.created_by,
            "created_at": room.created_at.isoformat() if room.created_at else None,
            "participants": room.participants or [],
            "activities": room.activities or []
        }
        return jsonify(room_data)
    finally:
        db.close()

def generate_unique_room_code(db, max_attempts=10):
    """Generate a unique 6-character room code"""
    for _ in range(max_attempts):
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        existing_room = db.query(Room).filter(Room.code == code).first()
        if not existing_room:
            return code
    raise Exception("Could not generate unique room code")


# Activity Endpoints
@app.route('/api/activities', methods=['POST'])
def create_activity():
    """Handle activity creation"""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON format"}), 400
        
    required_fields = ['room_code', 'emoji', 'title', 'description']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({"error": f"Missing required field: {field}"}), 400

    db = get_db()
    try:
        room = db.query(Room).filter(Room.code == data['room_code'].upper()).first()
        if not room:
            return jsonify({"error": f"Room with code '{data['room_code']}' not found"}), 404

        new_activity = Activity(
            id=str(uuid.uuid4()),
            room_code=data['room_code'].upper(),
            emoji=data['emoji'].strip(),
            title=data['title'].strip(),
            description=data['description'].strip(),
            submitted_by=data.get('submitted_by', 'Anonymous').strip(),
            votes={"yes": [], "no": []},
            created_at=datetime.utcnow()
        )
        db.add(new_activity)

        room_activities = room.activities or []
        activity_data_for_room = {
            "id": new_activity.id,
            "emoji": new_activity.emoji,
            "title": new_activity.title,
        }
        room_activities.append(activity_data_for_room)
        room.activities = room_activities
        
        db.commit()

        activity_data = {
            "id": new_activity.id,
            "emoji": new_activity.emoji,
            "title": new_activity.title,
            "description": new_activity.description,
            "submitted_by": new_activity.submitted_by,
            "votes": new_activity.votes,
            "created_at": new_activity.created_at.isoformat()
        }
        return jsonify(activity_data), 201
    except Exception as e:
        db.rollback()
        print(f"Database error: {str(e)}")
        return jsonify({"error": "Failed to create activity"}), 500
    finally:
        db.close()

@app.route('/api/activities', methods=['GET'])
def get_activities():
    """Handle activity retrieval by room code"""
    room_code = request.args.get('room_code')
    if not room_code:
        return jsonify({"error": "Room code is required"}), 400

    db = get_db()
    try:
        activities = db.query(Activity).filter(Activity.room_code == room_code.upper()).all()
        activities_data = []
        for activity in activities:
            activity_data = {
                "id": activity.id,
                "emoji": activity.emoji,
                "title": activity.title,
                "description": activity.description,
                "submitted_by": activity.submitted_by,
                "votes": activity.votes,
                "created_at": activity.created_at.isoformat() if activity.created_at else None
            }
            activities_data.append(activity_data)
        return jsonify(activities_data)
    finally:
        db.close()

# The existing catch-all route can be removed if all routes are explicitly defined.
# If you want to keep it, make sure it doesn't conflict with other routes.
# For now, I am removing it to have clearly defined API endpoints.
# If you need a catch-all for /api/*, it can be added back.