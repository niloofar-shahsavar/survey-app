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
    # Login and get access token
    
    # 1. Find user by email
    user = db.execute(
        select(User).where(User.email == form_data.username)
    ).scalars().first()
    
    # 2. Check user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # 3. Verify password
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # 4. Create token
    token = create_database_token(user_id=user.id, db=db)
    
    # 5. Return token
    return {"access_token": token.token, "token_type": "bearer"}