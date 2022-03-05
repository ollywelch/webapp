from app.db.base import Base
from sqlalchemy import Boolean, Column, String


class User(Base):
    __tablename__ = "users"

    username = Column(String, unique=True, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
