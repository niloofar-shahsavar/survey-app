import base64
import hashlib
from random import SystemRandom

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from .database import SessionLocal
from .models import Token, User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token") 
# this part tells fast api to look for token in auth 


def hash_password(password: str) -> str:
    # Converts password to unreadable string
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Checks if typed password matches stored hash
    return hash_password(plain_password) == hashed_password

DEFAULT_ENTROPY = 32
_sysrand = SystemRandom()


def token_urlsafe(nbytes=None):
    # Generate a random URL-safe token
    if nbytes is None:
        nbytes = DEFAULT_ENTROPY
    tok = _sysrand.randbytes(nbytes)
    return base64.urlsafe_b64encode(tok).rstrip(b"=").decode("ascii")

def create_database_token(user_id: int, db: Session) -> Token:
    # Create a random token and store it in the database
    randomized_token = token_urlsafe()
    new_token = Token(token=randomized_token, user_id=user_id)
    db.add(new_token)
    db.commit()
    db.refresh(new_token)
    return new_token

def get_db():
    # Get database session
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    # Get current user from token - used to protect endpoints
    # Depends(oauth2_scheme) — extracts token from header
    # Depends(get_db) — gets database connection
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    db_token = db.execute(
        select(Token).where(Token.token == token)
        #finds token in database
    ).scalars().first()
    
    if not db_token:
        raise credentials_exception
    
    return db_token.user