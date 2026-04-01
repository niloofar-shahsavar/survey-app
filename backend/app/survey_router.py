from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from .models import Survey, Question, User, Response, Answer
from .schemas import SurveyCreate, QuestionCreate, SurveyResponseSubmit
from .security import get_db, get_current_user

router = APIRouter()


@router.post("/", status_code=201)
def create_survey(survey: SurveyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Create a new survey
    new_survey = Survey(
        title=survey.title,
        description=survey.description,
        owner_id=current_user.id
    )
    db.add(new_survey)
    db.commit()
    db.refresh(new_survey)
    return new_survey


@router.get("/")
def get_surveys(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Get all surveys for current user
    surveys = db.execute(
        select(Survey).where(Survey.owner_id == current_user.id)
    ).scalars().all()
    
    result = []
    for s in surveys:
        response_count = db.execute(
            select(Response).where(Response.survey_id == s.id)
        ).scalars().all()
        result.append({
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "questions_count": len(s.questions),
            "response_count": len(response_count)
        })
    return result


@router.get("/{survey_id}")
def get_survey(survey_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Get one survey by ID with questions
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    return {
        "id": survey.id,
        "title": survey.title,
        "description": survey.description,
        "questions": [{"id": q.id, "text": q.text, "type": q.type, "options": q.options, "required": q.required} for q in survey.questions]
    }


@router.put("/{survey_id}")
def update_survey(survey_id: int, survey_data: SurveyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Update a survey
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()

    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    survey.title = survey_data.title
    survey.description = survey_data.description
    db.commit()
    db.refresh(survey)
    return survey


@router.delete("/{survey_id}", status_code=204)
def delete_survey(survey_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Delete a survey
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    db.delete(survey)
    db.commit()
    return None


@router.post("/{survey_id}/questions")
def add_question(survey_id: int, question: QuestionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Add a question to a survey
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    db_question = Question(text=question.text, type=question.type, options=question.options, required=question.required, survey_id=survey_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    
    return {"id": db_question.id, "text": db_question.text, "type": db_question.type, "options": db_question.options, "required": db_question.required, "survey_id": db_question.survey_id}


@router.post("/{survey_id}/questions/batch")
def add_questions_batch(survey_id: int, questions: List[QuestionCreate], db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Add multiple questions at once
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    created_questions = []
    for q in questions:
        db_question = Question(text=q.text, survey_id=survey_id)
        db.add(db_question)
        db.flush()
        created_questions.append({"id": db_question.id, "text": db_question.text})
    
    db.commit()
    return {"survey_id": survey_id, "questions": created_questions}

@router.delete("/{survey_id}/questions/{question_id}", status_code=204)
def delete_question(survey_id: int, question_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Delete a question from survey
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    question = db.execute(
        select(Question).where(Question.id == question_id, Question.survey_id == survey_id)
    ).scalars().first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    db.delete(question)
    db.commit()
    return None

@router.put("/{survey_id}/questions/{question_id}")
def update_question(survey_id: int, question_id: int, question_data: QuestionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Update a question
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    question = db.execute(
        select(Question).where(Question.id == question_id, Question.survey_id == survey_id)
    ).scalars().first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question.text = question_data.text
    question.required = question_data.required
    db.commit()
    db.refresh(question)
    
    return {"id": question.id, "text": question.text, "type": question.type, "options": question.options, "required": question.required, "survey_id": question.survey_id}
# PUBLIC ENDPOINTS FOR RESPONDENTS (NO AUTH REQUIRED)

@router.get("/public/{survey_id}")
def get_survey_public(survey_id: int, db: Session = Depends(get_db)):
    # Get survey with questions for public respondents (no auth required)
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    return {
        "id": survey.id,
        "title": survey.title,
        "description": survey.description,
        "questions": [{"id": q.id, "text": q.text, "type": q.type, "options": q.options, "required": q.required} for q in survey.questions]
    }


@router.post("/public/{survey_id}/submit")
def submit_survey_response(survey_id: int, response_data: SurveyResponseSubmit, db: Session = Depends(get_db)):
    # Submit survey response from public respondent (no auth required)
    
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    # Create response record
    new_response = Response(survey_id=survey_id)
    db.add(new_response)
    db.flush()
    
    # Add answers
    for answer in response_data.answers:
        new_answer = Answer(
            response_id=new_response.id,
            question_id=answer.question_id,
            answer_text=answer.answer_text
        )
        db.add(new_answer)
    
    db.commit()
    db.refresh(new_response)
    
    return {"id": new_response.id, "message": "Response submitted successfully"}


@router.get("/{survey_id}/responses")
def get_survey_responses(survey_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Get all responses for a survey (only for owner)
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    responses = db.execute(
        select(Response).where(Response.survey_id == survey_id)
    ).scalars().all()
    
    formatted_responses = []
    for response in responses:
        answers = db.execute(
            select(Answer).where(Answer.response_id == response.id)
        ).scalars().all()
        
        formatted_responses.append({
            "id": response.id,
            "answers": [
                {
                    "id": ans.id,
                    "question_id": ans.question_id,
                    "answer_text": ans.answer_text,
                    "question_text": db.execute(
                        select(Question).where(Question.id == ans.question_id)
                    ).scalars().first().text
                } for ans in answers
            ]
        })
    
    return {
        "survey_id": survey_id,
        "total_responses": len(responses),
        "responses": formatted_responses
    }