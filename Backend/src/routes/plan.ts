import { Router } from "express"
import { callOrTools, generateAIExplanation } from "../services/services"

const router = Router()

router.post("/", async (req, res) => {
  try {
    //Calling OR Tools Api
    const plans = await callOrTools(req.body)
    
    //Format Response
    const schedule = plans.map((plan: any) => ({
      task: plan.task,
      start: plan.start,
      end: plan.end,
      duration: plan.end - plan.start
    }))
    
    //Generate AI Explanation
    const explanation = await generateAIExplanation(schedule)
    
    //Sending reponse
    res.json({ 
      schedule,
      explanation,
    })
    
  } catch (err: any) {
    console.error("Erreur:", err.message)
    res.status(500).json({ 
      error: "Erreur lors de la génération du planning",
      details: err.message 
    })
  }
})

export default router