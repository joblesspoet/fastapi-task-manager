from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from tasks_db import get_db, Task
from transformers import pipeline
from sqlalchemy import desc
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI Setup: Hugging Face Text Classification model
task_classifier = pipeline("zero-shot-classification")


class TaskCreate(BaseModel):
    description: str


class TaskOut(BaseModel):
    id: int
    description: str
    priority: str
    category: str

    class Config:
        orm_mode = True


@app.post("/tasks/", response_model=TaskOut)
async def add_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Use NLP model to determine priority and category
    result = task_classifier(task.description, candidate_labels=[
                             "urgent", "work", "personal", "low", "high", "medium"])

    priority = result['labels'][0]  # Use highest confidence label for priority
    # Use second highest confidence label for category
    category = result['labels'][1]

    db_task = Task(description=task.description,
                   priority=priority, category=category)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@app.get("/tasks/", response_model=List[TaskOut])
async def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).order_by(desc(Task.id)).all()
    return tasks
