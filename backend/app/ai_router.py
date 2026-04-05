from fastapi import APIRouter, Depends, HTTPException, status
from dotenv import load_dotenv
from pydantic import BaseModel
import os
from sqlalchemy.orm import Session
from sqlalchemy import select
from .models import Survey, User, Response, Answer
from .security import get_db, get_current_user

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
    - type: one of "text", "rating", "multiple_choice", or "multi_select"
    - options: comma-separated choices (only for multiple_choice and multi_select, null for others)

    Use multi_select when users should be able to choose more than one option (e.g., "Select all that apply").
    Use multiple_choice when users should pick only one option.
    
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
    

@router.get("/{survey_id}/ai-analysis")
def get_ai_analysis(survey_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()

    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    responses = db.execute(
        select(Response).where(Response.survey_id == survey_id)
    ).scalars().all()

    if len(responses) == 0:
        return {"analysis": "No responses to analyze yet."}

    # Build summary of all responses for AI
    summary_parts = []
    summary_parts.append(f"Survey: {survey.title}")
    if survey.description:
        summary_parts.append(f"Description: {survey.description}")
    summary_parts.append(f"Total responses: {len(responses)}")
    summary_parts.append("")

    for question in survey.questions:
        answers = db.execute(
            select(Answer).where(
                Answer.question_id == question.id,
                Answer.response_id.in_([r.id for r in responses])
            )
        ).scalars().all()

        answer_texts = [a.answer_text for a in answers if a.answer_text]

        summary_parts.append(f"Question ({question.type}): {question.text}")
        summary_parts.append(f"Answers ({len(answer_texts)}): {', '.join(answer_texts)}")
        summary_parts.append("")

    survey_data = "\n".join(summary_parts)

    # Send to Gemini
    try:
        import google.generativeai as genai
        import os
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-2.5-flash-lite')

        prompt = f"""Analyze the following survey responses and provide actionable insights.

{survey_data}

Provide your analysis in this exact JSON format (return ONLY valid JSON, no markdown):
{{
  "summary": "2-3 sentence overall summary of the survey results",
  "key_findings": ["finding 1", "finding 2", "finding 3"],
  "sentiment": "positive, negative, mixed, or neutral",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "notable_patterns": "Any interesting patterns or trends in the data"
}}"""

        response = model.generate_content(prompt)
        result_text = response.text.strip()

        # Clean markdown if present
        if result_text.startswith("```"):
            result_text = result_text.replace("```json", "").replace("```", "").strip()

        import json
        analysis = json.loads(result_text)
        return {"analysis": analysis}

    except Exception as e:
        return {"analysis": None, "error": str(e)}