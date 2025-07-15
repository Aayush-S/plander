from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import json
import sys
import os

# Add the api directory to the Python path so we can import db_config
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from db_config import get_db, Room

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse the URL and query parameters
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            
            # Get the room code from query parameters
            room_code = query_params.get('code', [None])[0]
            
            if not room_code:
                self.send_error_response(400, "Room code is required")
                return
            
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
                
        except Exception as e:
            print(f"Error in room endpoint: {str(e)}")
            self.send_error_response(500, "Internal server error")
    
    def send_success_response(self, data):
        self.send_response(200)
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