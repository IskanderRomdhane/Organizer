from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from orTools import solve_planning

app = FastAPI()

class Task(BaseModel):
    name: str
    duration: int

@app.get("/")
def root():
    return {"message": "OR-Tools solver is running"}

@app.post("/solve")
def solve(tasks: List[Task]):
    task_dicts = [task.dict() for task in tasks]
    return solve_planning(task_dicts)
