from fastapi import FastAPI

from app.db.base import Base
from app.db.session import engine
from app.schemas.user import User
from app.routes import user, auth

Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/")
async def root():
    return [{"message": "Hello World"}]

app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])