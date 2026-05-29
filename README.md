# todo-auth-app

## Prerequisites
To run the todo-auth-app project, you will need to have the following software installed:
- Python 3.9+
- pip 21.2+
- Node.js 16.14+
- npm 8.5+
- PostgreSQL 14+
- Vite 3.0+
- TailwindCSS 3.1+
- TypeScript 4.6+

Based on the requirements.txt and package.json files, the exact versions needed are:
- Python: 3.9.13
- pip: 21.2.4
- Node.js: 16.14.2
- npm: 8.5.5
- PostgreSQL: 14.5
- Vite: 3.0.2
- TailwindCSS: 3.1.8
- TypeScript: 4.6.4
- FastAPI: 0.92.0
- SQLAlchemy: 2.0.3
- asyncpg: 0.26.0
- React: 18.2.0
- React-DOM: 18.2.0

## Project Structure
The project has the following file tree:
```markdown
todo-auth-app/
├── backend/
│   ├── __init__.py
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes.py
│   ├── schemas.py
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Dashboard.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ui.tsx
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env
│   └── vite.config.ts
├── .env.example
├── docker-compose.yml
└── setup.bat
    setup.sh
```

## Backend Setup
### 1. Create virtual environment
To create a virtual environment for the backend, run the following command:
```bash
python -m venv venv
```
This will create a new virtual environment named `venv` in the current directory.

### 2. Activate virtual environment
To activate the virtual environment, run the following command:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

This will activate the virtual environment, and you should see the name of the virtual environment printed in your terminal.

### 3. Install dependencies
To install the dependencies for the backend, run the following command:
```bash
pip install -r requirements.txt
```
This will install all the dependencies listed in the `requirements.txt` file.

### 4. Create PostgreSQL database
To create a new PostgreSQL database, run the following command:
```bash
createdb todo-auth-app
```
Alternatively, you can use the psql command:
```bash
psql -U postgres -c 'CREATE DATABASE todo-auth-app;'
```
This will create a new database named `todo-auth-app`.

### 5. Configure environment variables
To configure the environment variables for the backend, create a new file named `.env` in the `backend` directory with the following contents:
```makefile
DATABASE_URL=postgresql+asyncpg://postgres:your_password@localhost:5432/todo-auth-app
```
Replace `your_password` with your actual PostgreSQL password.

Note: You will also need to set the following environment variables:
- `DATABASE_URL`: the connection URL for the PostgreSQL database

### 6. Start backend
To start the backend server, navigate to the `backend` directory and run the following command:
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```
The backend API will be available at `http://localhost:8001`.
The API documentation will be available at `http://localhost:8001/docs`.

## Quick Start
To set up and launch both servers automatically, run the following command:
- Windows: `setup.bat`
- Mac/Linux: `bash setup.sh`

## Frontend Setup
### 1. Install dependencies
To install the dependencies for the frontend, navigate to the `frontend` directory and run the following command:
```bash
cd frontend
npm install
```
This will install all the dependencies listed in the `package.json` file.

### 2. Configure environment
To configure the environment variables for the frontend, create a new file named `.env` in the `frontend` directory with the following contents:
```makefile
VITE_API_URL=http://localhost:8001
```
This sets the API URL for the frontend.

Note: You will also need to set the following environment variables:
- `VITE_API_URL`: the URL for the backend API

### 3. Start frontend
To start the frontend server, navigate to the `frontend` directory and run the following command:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Running Both Together
To run both the backend and frontend servers together, open two terminals:
Terminal 1 (Backend):
```bash
cd backend
uvicorn main:app --port 8001 --reload
```
Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## API Endpoints
The following API endpoints are available in the `routes.py` file:
- `GET /`: the root endpoint
- `POST /token`: the endpoint for obtaining a JWT token
- `POST /register`: the endpoint for registering a new user
- `GET /users/me`: the endpoint for retrieving the current user
- `GET /todos`: the endpoint for retrieving all todos
- `POST /todos`: the endpoint for creating a new todo
- `GET /todos/{todo_id}`: the endpoint for retrieving a single todo
- `PUT /todos/{todo_id}`: the endpoint for updating a single todo
- `DELETE /todos/{todo_id}`: the endpoint for deleting a single todo

## Common Issues & Fixes
- Database connection error: Verify PostgreSQL is running with: `pg_isready`
- Port in use: Change port with `--port` flag
- Module not found: Make sure virtual environment is activated
- `npm install` fails: Try `npm install --legacy-peer-deps`

## Tech Stack
- Backend: FastAPI, SQLAlchemy 2.0, asyncpg, PostgreSQL
- Frontend: React 18, TypeScript, TailwindCSS (Vite)
- Database: PostgreSQL 14+