from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import sys
import os
from datetime import datetime
import uuid

# Add the api directory to the Python path so we can import db_config
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from db_config import get_db, Room, Activity, create_tables

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle activity creation"""
        try:
            # Read the request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            # Parse JSON data
            try:
                data = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError:
                self.send_error_response(400, "Invalid JSON format")
                return
            
            # Validate required fields
            required_fields = ['room_code', 'emoji', 'title', 'description']
            for field in required_fields:
                if field not in data or not str(data[field]).strip():
                    self.send_error_response(400, f"Missing required field: {field}")
                    return
            
            # Get database session
            db = get_db()
            
            try:
                # Ensure tables exist
                create_tables()
                
                # Verify room exists
                room = db.query(Room).filter(Room.code == data['room_code'].upper()).first()
                if not room:
                    self.send_error_response(404, f"Room with code '{data['room_code']}' not found")
                    return
                
                # Create new activity
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
                
                # Add to database
                db.add(new_activity)
                
                # Update room activities list
                room_activities = room.activities or []
                activity_data = {
                    "id": new_activity.id,
                    "emoji": new_activity.emoji,
                    "title": new_activity.title,
                    "description": new_activity.description,
                    "submitted_by": new_activity.submitted_by,
                    "votes": new_activity.votes,
                    "created_at": new_activity.created_at.isoformat()
                }
                room_activities.append(activity_data)
                room.activities = room_activities
                
                db.commit()
                
                # Prepare response
                self.send_success_response(activity_data, 201)
                
            except Exception as e:
                db.rollback()
                print(f"Database error: {str(e)}")
                self.send_error_response(500, "Failed to create activity")
            finally:
                db.close()
                
        except Exception as e:
            print(f"Error in create_activity endpoint: {str(e)}")
            self.send_error_response(500, "Internal server error")
    
    def do_GET(self):
        """Handle activity retrieval by room code"""
        try:
            # Parse the URL and query parameters
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            
            # Get the room code from query parameters
            room_code = query_params.get('room_code', [None])[0]
            
            if not room_code:
                self.send_error_response(400, "Room code is required")
                return
            
            # Get database session
            db = get_db()
            
            try:
                # Query the database for activities
                activities = db.query(Activity).filter(Activity.room_code == room_code.upper()).all()
                
                # Convert activities to response format
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
                
                self.send_success_response(activities_data)
                
            finally:
                db.close()
                
        except Exception as e:
            print(f"Error in get_activities endpoint: {str(e)}")
            self.send_error_response(500, "Internal server error")
    
    def send_success_response(self, data, status_code=200):
        self.send_response(status_code)
        self.send_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_error_response(self, status_code, message):
        self.send_response(status_code)
        self.send_headers()
        error_response = {"error": message}
        self.wfile.write(json.dumps(error_response).encode())
    
    def send_headers(self):
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_headers() 