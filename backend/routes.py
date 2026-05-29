from fastapi import APIRouter, Depends
from schemas import UserRequest
from auth import authenticate_user, get_current_user
from database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.post("/register")
async def register(payload: UserRequest, db: AsyncSession = Depends(get_db)):
    user = await db.execute("SELECT * FROM users WHERE username = :username", {"username": payload.username})
    if user:
        return {"message": "Username already exists"}
    db.execute("INSERT INTO users (username, password) VALUES (:username, :password)", {"username": payload.username, "password": payload.password})
    return {"message": "User created"}

@router.post("/login")
async def login(payload: UserRequest):
    user = await authenticate_user(payload.username, payload.password)
    if not user:
        return {"message": "Invalid username or password"}
    return {"message": "Logged in"}

@router.get("/todos")
async def get_todos(current_user: str = Depends(get_current_user)):
    db = next((await get_db()))
    todos = db.execute("SELECT * FROM todos WHERE user_id = :user_id", {"user_id": current_user.id})
    return [todo for todo in todos]

@router.post("/todos")
async def create_todo(todo: TodoRequest, db: AsyncSession = Depends(get_db), current_user: str = Depends(get_current_user)):
    db.execute("INSERT INTO todos (title, completed, user_id) VALUES (:title, :completed, :user_id)", {"title": todo.title, "completed": False, "user_id": current_user.id})
    return {"message": "Todo created"}
