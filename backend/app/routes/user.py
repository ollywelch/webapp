from typing import List

from app.deps import get_current_active_user, get_db
from app.schemas.user import User, UserCreate
from app.services.user import add_user, get_user, get_user_by_email, get_users
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return add_user(db=db, user=user)


@router.get("/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@router.get("/me", response_model=User)
def read_current_user(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)
):
    return current_user


@router.get("/{username}", response_model=User)
def read_user(username: str, db: Session = Depends(get_db)):
    db_user = get_user(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
