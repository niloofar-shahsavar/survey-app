from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import Base
# from .ai_router import router as ai_router  # Temporarily disabled for testing
from .auth_routher import router as auth_router
from .survey_router import router as survey_router

app = FastAPI(title="Survey App Backend")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# app.include_router(ai_router, prefix="/ai", tags=["AI"])  # Temporarily disabled for testing
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(survey_router, prefix="/surveys", tags=["surveys"])

@app.get("/")
def home():
    return {"status": "Backend Running"}
