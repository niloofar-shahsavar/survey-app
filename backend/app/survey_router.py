from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Survey, User
from .schemas import SurveyCreate
from .security import get_db, get_current_user