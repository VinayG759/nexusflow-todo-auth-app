from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from pydantic import BaseModel

from database import get_db
from fastapi import Depends

class Token(BaseModel):
    access_token: str
    token_type: str

ACCESS_TOKEN_EXPIRE_MINUTES = 30

class TokenData(BaseModel):
    username: str | None = None

pwd_context = CryptContext(schemes=["bcrypt"], default="bcrypt")

token_url = "token"
oauth2_scheme = OAuth2PasswordBearer(token_url)

SECRET_KEY = "6b8e2e7b0c3e0c5a"
ALGORITHM = "HS256"

async def authenticate_user(username: str, password: str):
    db = next((await get_db()))
    user = None
    for u in db:
        if u.username == username:
            user = u
            break
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = None
    db = next((await get_db()))
    for u in db:
        if u.username == token_data.username:
            user = u
            break
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: str = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

async def get_password_hash(password: str):
    return pwd_context.hash(password)
