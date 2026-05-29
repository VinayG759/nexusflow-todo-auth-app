from sqlalchemy import Column, String, Integer, Boolean
from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)

class Todo(Base):
    __tablename__ = 'todos'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    completed = Column(Boolean)
    user_id = Column(Integer)