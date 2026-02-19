from fastapi import APIRouter
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@router.post("/generate-questions")
async def generate_questions(goal: str):
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
