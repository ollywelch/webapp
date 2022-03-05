from pydantic import BaseSettings


class Settings(BaseSettings):
    db_user: str
    db_password: str
    db_database: str = ""
    db_host: str = ""
    db_port: str = ""
    is_db_sqlite: bool = True
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expires_minutes: int = 30

    class Config:
        env_file = ".env"
        secrets_dir = "/run/secrets"


config = Settings()
