from fastapi import APIRouter
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

# Try to import genai, but allow app to run without it
try:
    from google import genai
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    genai_available = True
except ImportError:
    genai_available = False
    print("Warning: google-genai not available. AI features disabled.")

@router.post("/generate-questions")
async def generate_questions(goal: str):
    if not genai_available:
        return {"error": "AI service is currently unavailable. Please add GEMINI_API_KEY to .env file"}
    
    prompt = f"""
    You are a survey expert. Based on this goal, generate 5 survey questions.
    
    Goal: {goal}
    
    Return ONLY a JSON array of questions like this:
    [
        {{"text": "Question 1?", "type": "rating"}},
        {{"text": "Question 2?", "type": "text"}},
        {{"text": "Question 3?", "type": "multiple_choice"}}
    ]
    
    Types can be: rating, text, or multiple_choice
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    
    return {"questions": response.text}
