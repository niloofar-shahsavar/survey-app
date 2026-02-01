from fastapi import FastAPI

app = FastAPI(title="Survey App Backend")

@app.get("/")
def health_check():
    return {"status": "Backend is ready"}
