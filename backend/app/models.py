from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean, DateTime
from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy.sql import func
from typing import Optional
from datetime import datetime
from .database import Base

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

class User(Base):
    __tablename__ = "users"

    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)

    surveys: Mapped[list["Survey"]] = relationship(back_populates="owner")
    tokens: Mapped[list["Token"]] = relationship(back_populates="user")


class Survey(Base):
    __tablename__ = "surveys"

    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    owner: Mapped[Optional["User"]] = relationship(back_populates="surveys")
    questions: Mapped[list["Question"]] = relationship(back_populates="survey")
    responses: Mapped[list["Response"]]= relationship(back_populates="survey")
    analysis: Mapped[Optional["Analysis"]] = relationship(back_populates="survey", uselist=False)


class Question(Base):
    __tablename__ = "questions"

    text: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, default="text", nullable=False)
    options: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    required: Mapped[bool] = mapped_column(Boolean, default=True)

    survey_id: Mapped[Optional[int]] = mapped_column(ForeignKey("surveys.id"))

    survey: Mapped[Optional["Survey"]] = relationship(back_populates="questions")
    answers: Mapped[list["Answer"]] = relationship(back_populates="question")


class Response(Base):
    __tablename__ = "responses"

    survey_id: Mapped[Optional[int]] = mapped_column(ForeignKey("surveys.id"))

    survey: Mapped[Optional["Survey"]] = relationship(back_populates="responses")
    answers: Mapped[list["Answer"]] = relationship(back_populates="response")


class Answer(Base):
    __tablename__ = "answers"

    answer_text: Mapped[str] = mapped_column(Text, nullable=False)

    response_id: Mapped[Optional[int]] = mapped_column(ForeignKey("responses.id"))
    question_id: Mapped[Optional[int]] = mapped_column(ForeignKey("questions.id"))

    response: Mapped[Optional["Response"]] = relationship(back_populates="answers")
    question: Mapped[Optional["Question"]] = relationship(back_populates="answers")


class Token(Base):
    __tablename__ = "tokens"

    token: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))

    user: Mapped[Optional["User"]] = relationship(back_populates="tokens")


class Analysis(Base):
    __tablename__ = "analyses"

    survey_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("surveys.id"),
        unique=True,
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    survey: Mapped[Optional["Survey"]] = relationship(back_populates="analysis")