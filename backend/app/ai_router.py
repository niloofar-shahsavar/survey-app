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
    
    Return ONLY a valid JSON array with no extra text. Each question must have:
    - text: the question
    - type: one of "text", "rating", or "multiple_choice"
    - options: comma-separated choices (only for multiple_choice, null for others)
    
    Example format:
    [
      {{"text": "How satisfied are you?", "type": "rating", "options": null}},
      {{"text": "What could we improve?", "type": "text", "options": null}},
      {{"text": "How did you find us?", "type": "multiple_choice", "options": "Google, Friend, Social Media, Other"}}
    ]
    
    Mix different types. Return ONLY the JSON array, nothing else.
    """
    
    try:
        response = model.generate_content(prompt)
        return {"questions": response.text}
    except Exception as e:
        return {"error": str(e)}