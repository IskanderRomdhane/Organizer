import axios from "axios"

// OR Tools 
export async function callOrTools(tasks: any[]) {
  const url = process.env.SOLVER_API_URL

  if (!url) {
    throw new Error("SOLVER_API_URL n'est pas défini")
  }

  const response = await axios.post(url, tasks)
  return response.data
}

//Explication IA
export async function generateAIExplanation(planning: any[]) {
  const aiUrl = process.env.AI_MODEL_API

  if (!aiUrl) {
    throw new Error("AI_EXPLAIN_API_URL n'est pas défini")
  }

  const response = await axios.post(aiUrl, {
    planning
  })

  return response.data.explanation
}
