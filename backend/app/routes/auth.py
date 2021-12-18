from typing import List
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.schemas.auth import Token
from app.services.auth import login_and_create_access_token
from app.deps import get_db

router = APIRouter()

@router.post("/token", response_model=Token)
def create_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Token:
    return login_and_create_access_token(db=db, username=form_data.username, password=form_data.password)