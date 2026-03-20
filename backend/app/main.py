import sys
import os

# Add the parent directory (backend) to sys.path so Vercel can find the 'app' module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Go up two levels: app/ -> backend/ -> root/
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))

from app.api.endpoints import router as cv_router

app = FastAPI(title="FuturFly CV Parser API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv_router, prefix="/api/cv", tags=["CV Extraction"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "FuturFly CV Backend is running."}

# To run locally: uvicorn app.main:app --reload
