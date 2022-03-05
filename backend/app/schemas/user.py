from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    is_active: bool

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str
