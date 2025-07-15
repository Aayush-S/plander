from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import sys
import os
import random
import string
from datetime import datetime
import uuid

# Add the api directory to the Python path so we can import db_config
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from db_config import get_db, Room, create_tables

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle room creation"""
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
            required_fields = ['name', 'destination', 'created_by']
            for field in required_fields:
                if field not in data or not data[field].strip():
                    self.send_error_response(400, f"Missing required field: {field}")
                    return
            
            # Get database session
            db = get_db()
            
            try:
                # Ensure tables exist
                create_tables()
                
                # Generate unique room code
                room_code = self.generate_unique_room_code(db)
                
                # Create new room
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
                
                # Add to database
                db.add(new_room)
                db.commit()
                
                # Prepare response
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
                
                self.send_success_response(room_data, 201)
                
            except Exception as e:
                db.rollback()
                print(f"Database error: {str(e)}")
                self.send_error_response(500, "Failed to create room")
            finally:
                db.close()
                
        except Exception as e:
            print(f"Error in create_room endpoint: {str(e)}")
            self.send_error_response(500, "Internal server error")
    
    def do_GET(self):
        """Handle room retrieval by code"""
        try:
            # Parse the URL to get the room code from the path
            parsed_url = urlparse(self.path)
            path_parts = parsed_url.path.strip('/').split('/')
            
            # Check if this is a request for /rooms/code/{room_code}
            if len(path_parts) >= 3 and path_parts[1] == 'code':
                room_code = path_parts[2]
                
                # Get database session
                db = get_db()
                
                try:
                    # Query the database for the room
                    room = db.query(Room).filter(Room.code == room_code.upper()).first()
                    
                    if not room:
                        self.send_error_response(404, f"Room with code '{room_code}' not found")
                        return
                    
                    # Convert room data to response format
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
                    
                    self.send_success_response(room_data)
                    
                finally:
                    db.close()
            else:
                self.send_error_response(400, "Invalid room request format")
                
        except Exception as e:
            print(f"Error in get_room endpoint: {str(e)}")
            self.send_error_response(500, "Internal server error")
    
    def generate_unique_room_code(self, db, max_attempts=10):
        """Generate a unique 6-character room code"""
        for _ in range(max_attempts):
            # Generate random 6-character code (letters and numbers)
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            
            # Check if code already exists
            existing_room = db.query(Room).filter(Room.code == code).first()
            if not existing_room:
                return code
        
        # If we couldn't generate a unique code after max_attempts
        raise Exception("Could not generate unique room code")
    
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