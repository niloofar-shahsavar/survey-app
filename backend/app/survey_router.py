from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List

from .database import engine
from .models import Base, Survey, Question, User
from .schemas import (
    SurveyCreate, 
    QuestionCreate,
)
from .security import get_db, get_current_user

router = APIRouter()

# Create tables
Base.metadata.create_all(bind=engine)


@router.post("")
def create_survey(
    survey: SurveyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new survey for the current user
    """
    db_survey = Survey(
        title=survey.title,
        description=survey.description,
        owner_id=current_user.id
    )
    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    
    return {
        "id": db_survey.id,
        "title": db_survey.title,
        "description": db_survey.description,
        "owner_id": db_survey.owner_id
    }


@router.get("")
def get_user_surveys(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all surveys for the current user
    """
    surveys = db.execute(
        select(Survey).where(Survey.owner_id == current_user.id)
    ).scalars().all()
    
    return [
        {
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "questions_count": len(s.questions)
        }
        for s in surveys
    ]


@router.get("/{survey_id}")
def get_survey(
    survey_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific survey with all its questions
    """
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Survey not found"
        )
    
    # Check if user owns this survey
    if survey.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to view this survey"
        )
    
    return {
        "id": survey.id,
        "title": survey.title,
        "description": survey.description,
        "questions": [
            {
                "id": q.id,
                "text": q.text
            }
            for q in survey.questions
        ]
    }


@router.post("/{survey_id}/questions")
def add_question(
    survey_id: int,
    question: QuestionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Add a question to a survey
    """
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Survey not found"
        )
    
    # Check if user owns this survey
    if survey.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to modify this survey"
        )
    
    db_question = Question(
        text=question.text,
        survey_id=survey_id
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    
    return {
        "id": db_question.id,
        "text": db_question.text,
        "survey_id": db_question.survey_id
    }


@router.post("/{survey_id}/questions/batch")
def add_questions_batch(
    survey_id: int,
    questions: List[QuestionCreate],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Add multiple questions to a survey at once
    """
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Survey not found"
        )
    
    # Check if user owns this survey
    if survey.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to modify this survey"
        )
    
    created_questions = []
    for q in questions:
        db_question = Question(
            text=q.text,
            survey_id=survey_id
        )
        db.add(db_question)
        db.flush()  # Flush to get the ID
        created_questions.append({
            "id": db_question.id,
            "text": db_question.text
        })
    
    db.commit()
    
    return {
        "survey_id": survey_id,
        "questions": created_questions
    }


@router.delete("/{survey_id}")
def delete_survey(
    survey_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a survey (only by owner)
    """
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Survey not found"
        )
    
    # Check if user owns this survey
    if survey.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete this survey"
        )
    
    db.delete(survey)
    db.commit()
    
    return {"message": "Survey deleted successfully"}
