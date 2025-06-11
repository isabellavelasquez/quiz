import express from "express"
import { getQuestions, addQuestion, deleteQuestion, updateQuestion } from "../controllers/questionControllers.mjs"
import { QuestionDto } from "../models/QuestionDto.mjs"

export const questionRouter = express.Router()

questionRouter.get("/", async (_, res) => {
    try {
        const questions = await getQuestions();
        res.status(200).json({ message: "Questions fetched successfully", questions })
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
            await addQuestion(questionData);
            res.status(200).json({ message: "Question and answers added successfully", questionData })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }  
})

questionRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const questionData: QuestionDto = req.body;

        if(!id) {
            console.error(`Id ${id} not found`);
            res.status(400).send(`Id ${id} not found`);
        }
        if (!questionData) {
            res.status(400).json({ message: "Invalid question or answers provided." });
        } else {
            const updatedQuestion = await updateQuestion(+id, questionData);
            res.status(200).json({ message: "Question updated successfully", updatedQuestion});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
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