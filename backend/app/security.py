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