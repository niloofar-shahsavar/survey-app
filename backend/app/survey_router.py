from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from .models import Survey, Question, User
from .schemas import SurveyCreate, QuestionCreate
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
    return surveys


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
        "questions": [{"id": q.id, "text": q.text} for q in survey.questions]
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
    
    db_question = Question(text=question.text, survey_id=survey_id)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    
    return {"id": db_question.id, "text": db_question.text, "survey_id": db_question.survey_id}


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