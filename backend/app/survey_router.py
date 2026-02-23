from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Survey, User
from .schemas import SurveyCreate
from .security import get_db, get_current_user

router = APIRouter()

@router.post("/", status_code=201)
def create_survey(survey: SurveyCreate, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Create a new survey

    #1. create survey object linked to current user
    new_survey = Survey(
        title=survey.title,
        description=survey.description,
        owner_id=current_user.id
    )
    # Save to database 

    db.add(new_survey)
    db.commit()
    db.refresh(new_survey)

    # 3. Return the created survey

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
    # Get one survey by ID
    
    survey = db.execute(
        select(Survey).where(Survey.id == survey_id, Survey.owner_id == current_user.id)
    ).scalars().first()
    
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    
    return survey