from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .database import engine
from .models import Base, User
from .schemas import UserCreate, UserLogin, TokenSchema, UserOut
from .security import (
    hash_password,
    verify_password,
    create_database_token,
    get_db,
    get_current_user,
)

router = APIRouter()

# Create tables
Base.metadata.create_all(bind=engine)


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user = db.execute(
        select(User).where(User.email == user.email)
    ).scalars().first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create new user
    hashed_password = hash_password(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=TokenSchema)
def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Login user and return access token
    """
    # Find user by email
    db_user = db.execute(
        select(User).where(User.email == user_credentials.email)
    ).scalars().first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(user_credentials.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create token
    token = create_database_token(db_user.id, db)
    
    return {
        "access_token": token.token,
        "token_type": "bearer"
    }


@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    Get current user profile
    """
    return current_user


@router.post("/logout")
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Logout user (delete their token)
    """
    # Delete user's tokens
    for token in current_user.tokens:
        db.delete(token)
    
    db.commit()
    
    return {"message": "Successfully logged out"}
