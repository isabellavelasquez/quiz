import express from "express"
import { getQuestions, addQuestion, deleteQuestion } from "../controllers/questionControllers.mjs"
import { QuestionDto } from "../models/QuestionDto.mjs"

export const questionRouter = express.Router()

questionRouter.get("/",(req, res) => {
    try {
        const questions = getQuestions(req, res)
        console.log("Questions fetched successfully")
        res.status(200).json(questions)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

questionRouter.post("/", async (req, res) => {
    try {
        const questionData: QuestionDto = req.body
        if (!questionData.question || !questionData.answers) {
            res.status(401).json({ message: "Missing question and/or answer"});
        } else {
            console.log(questionData);
            await addQuestion(questionData);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }  
})

questionRouter.delete("/:id", (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            console.error("Id not found")
            res.status(400).send("Missing id")
        } else {
            deleteQuestion(+id)
            res.status(200).send("Question deleted successfully")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

export default questionRouter