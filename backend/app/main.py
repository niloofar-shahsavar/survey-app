from fastapi import FastAPI
from ai_router import router as ai_router

app = FastAPI(title="Survey App Backend")

app.include_router(ai_router, prefix="/ai", tags=["AI"])

@app.get("/")
def health_check():
    return {"status": "Backend is ready"}
