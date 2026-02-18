from pydantic import BaseModel
from typing import List, Optional


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class SurveyCreate(BaseModel):
    title: str
    description: Optional[str] = None


class QuestionCreate(BaseModel):
    text: str


class AnswerCreate(BaseModel):
    question_id: int
    answer_text: str


class ResponseCreate(BaseModel):
    answers: List[AnswerCreate]
