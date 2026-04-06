from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional



class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8, max_length=32)


class SurveyCreate(BaseModel):
    title: str
    description: Optional[str] = None


class QuestionCreate(BaseModel):
    text: str
    type: str = "text"
    options: Optional[str] = None
    required: bool = True


class AnswerCreate(BaseModel):
    question_id: int
    answer_text: str


class ResponseCreate(BaseModel):
    answers: List[AnswerCreate]

class TokenSchema(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=32)

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    
    class Config:
        from_attributes = True


# For public survey response submission
class SurveyResponseSubmit(BaseModel):
    answers: List[AnswerCreate]