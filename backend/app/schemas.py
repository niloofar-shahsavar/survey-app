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

class TokenSchema(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    
    class Config:
        from_attributes = True


# For public survey response submission
class SurveyResponseSubmit(BaseModel):
    answers: List[AnswerCreate]