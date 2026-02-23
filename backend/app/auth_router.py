from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session
from .models import User
from .schemas import TokenSchema
from .security import verify_password, create_database_token, get_db

router = APIRouter()

@router.post("/token", response_model=TokenSchema)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.email == form_data.username)).scalars().first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    token = create_database_token(user_id=user.id, db=db)
    return {"access_token": token.token, "token_type": "bearer"}
