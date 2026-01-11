import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.resolve(process.cwd(), ".env")
})

console.log("BOOT ENV:", process.env.SOLVER_API_URL)

import express from "express"
import cors from "cors"
import planRoutes from "./routes/plan"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/ajouterplan", planRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log("Solver API URL:", process.env.SOLVER_API_URL)
})