import express from "express"
import { getAllQuestions, addQuestion } from "../controllers/questionControllers.mjs"

const router = express.Router()

router.get("/allquestions", getAllQuestions)

// router.get("/:id", getQuestionById)

router.post("/addquestion", addQuestion)

export default router