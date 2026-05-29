from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class UserRequest(BaseModel):
    username: str
    password: str

class TodoRequest(BaseModel):
    title: str

class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
    model_config = ConfigDict(from_attributes=True)