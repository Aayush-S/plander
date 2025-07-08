from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from .db import init_db
from .routers import rooms, activities

# Load environment variables
load_dotenv()

app = FastAPI(title="Plander API")

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

# Include routers
app.include_router(rooms.router)
app.include_router(activities.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Plander API"}