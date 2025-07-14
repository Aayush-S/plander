from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Create FastAPI app
app = FastAPI(
    title="Plander API",
    description="Backend API for Plander application",
    version="1.0.0",
)

# Add CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple hello world endpoint
@app.get("/")
def root():
    return {"message": "Hello from Plander API"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI", "status": "success"}

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "plander-api"}
