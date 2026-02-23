
  GNU nano 8.7                                auth_routher.py                                Modified


























from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import User
from .schemas import TokenSchema
from .security import hash_password, verify_password, create_database_token, get_db

router = APIRouter()


@router.post("/register", response_model=TokenSchema)
def register(email: str, password: str, db: Session = Depends(get_db)):
    existing_user = db.execute(
        select(User).where(User.email == email)
    ).scalars().first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    new_user = User(email=email, password=hash_password(password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_database_token(user_id=new_user.id, db=db)

    return {"access_token": token.token, "token_type": "bearer"}


@router.post("/token", response_model=TokenSchema)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.execute(
        select(User).where(User.email == form_data.username)
    ).scalars().first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    token = create_database_token(user_id=user.id, db=db)

    return {"access_token": token.token, "token_type": "bearer"}
