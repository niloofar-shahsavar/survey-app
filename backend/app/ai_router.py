from fastapi import APIRouter
from dotenv import load_dotenv
from pydantic import BaseModel
import os

load_dotenv()

router = APIRouter()

class GenerateRequest(BaseModel):
    goal: str

# Try to import genai
try:
    import google.generativeai as genai
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-2.5-flash-lite')
    genai_available = True
except Exception as e:
    genai_available = False
    print(f"Warning: AI not available: {e}")

@router.post("/generate-questions")
async def generate_questions(request: GenerateRequest):
    goal = request.goal
    if not genai_available:
        return {"error": "AI service is currently unavailable"}
    
    prompt = f"""
    Generate 5 survey questions for this goal: {goal}
    
    Return ONLY a JSON array like this, nothing else:
    ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]
    """
    
    try:
        response = model.generate_content(prompt)
        return {"questions": response.text}
    except Exception as e:
        return {"error": str(e)}