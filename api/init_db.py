#!/usr/bin/env python3
"""
Database initialization script for Plander
Run this once to create the necessary tables in your Neon database
"""

import sys
import os

# Add the api directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from db_config import create_tables, get_engine
from sqlalchemy import text

def init_database():
    """Initialize the database with required tables"""
    try:
        print("Creating database tables...")
        create_tables()
        print("✅ Database tables created successfully!")
        
        # Test the connection
        engine = get_engine()
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection test successful!")
            
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    init_database() 