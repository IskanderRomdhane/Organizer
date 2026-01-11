import axios from "axios"

// OR-Tools API
export async function callOrTools(tasks: any[]) {
  const url = process.env.SOLVER_API_URL
  if (!url) throw new Error("SOLVER_API_URL non défini")

  const response = await axios.post(url, tasks, {
    timeout: 120000
  })

  return response.data
}

// IA
export async function generateAIExplanation(planning: any[]) {
  const aiUrl = process.env.AI_MODEL_API

  //Pas d'IA explication simple par défaut
  if (!aiUrl) {
    return generateFallbackExplanation(planning)
  }

  try {
    const response = await axios.post(aiUrl, { planning }, { timeout: 60000 })
    return response.data.explanation
  } catch (err) {
    //Si l'IA échoue donc fallback
    return generateFallbackExplanation(planning)
  }
}

// Explication locale simple
function generateFallbackExplanation(planning: any[]) {
  return planning
    .map(
      (p: any) =>
        `La tâche "${p.task}" commence au jour ${p.start} et se termine au jour ${p.end}.`
    )
    .join(" ")
}
