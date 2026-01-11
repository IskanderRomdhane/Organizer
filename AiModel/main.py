from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
import re

app = FastAPI()

model = OllamaLLM(model="planning-explainer")


class PlanningInput(BaseModel):
    planning: list


def generate_explanation(planning):
    prompt = f"""
Planning :
{planning}

Explique ce planning.
"""
    result = model.invoke(input=prompt)
    cleaned = re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL).strip()
    return cleaned


@app.post("/explain")
def explain(data: PlanningInput):
    explanation = generate_explanation(data.planning)
    return {"explanation": explanation}
