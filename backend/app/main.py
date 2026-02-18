from fastapi import FastAPI
from .database import engine
from .models import Base
from .ai_router import router as ai_router

app = FastAPI(title="Survey App Backend")

Base.metadata.create_all(bind=engine)

app.include_router(ai_router, prefix="/ai", tags=["AI"])

@app.get("/")
def home():
    return {"status": "Backend Running"}
