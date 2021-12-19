from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.settings import config

if config.is_db_sqlite:
    engine = create_engine(
        "sqlite:///app/db/app.db", connect_args={"check_same_thread": False}
    )
else:
    DB_USER = config.db_user
    DB_PASSWORD = config.db_password
    DB_HOST = config.db_host
    DB_PORT = config.db_port
    DB_DATABASE = config.db_database
    engine = create_engine(
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"
    )

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)