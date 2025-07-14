import sys
import os
from pathlib import Path

# Add the backend directory to Python path
backend_path = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_path))

try:
    from app.main import app
except ImportError as e:
    # Fallback for development or if imports fail
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    def fallback():
        return {"message": "API is running but main app import failed", "error": str(e)}

# This is what Vercel looks for
handler = app
