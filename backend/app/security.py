import hashlib, base64
from random import SystemRandom
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .models import Token, User
from .database import SessionLocal
from sqlalchemy import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

DEFAULT_ENTROPY = 32
_sysrand = SystemRandom()

def token_urlsafe(nbytes=None):
    if nbytes is None:
        nbytes = DEFAULT_ENTROPY
    tok = _sysrand.randbytes(nbytes)
    return base64.urlsafe_b64encode(tok).rstrip(b"=").decode("ascii")

def create_database_token(user_id: int, db: Session) -> Token:
    randomized_token = token_urlsafe()
    new_token = Token(token=randomized_token, user_id=user_id)
    db.add(new_token)
    db.commit()
    db.refresh(new_token)
    return new_token

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    db_token = db.execute(select(Token).where(Token.token == token)).scalars().first()
    if not db_token:
        raise credentials_exception
    return db_token.user
