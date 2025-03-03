import { Request, Response, text } from "express"
import { QuestionDTO } from "../models/QuestionDTO.mjs"
import Question from "../models/QuestionSchema.mjs"

// const questions: QuestionDTO[] = [
//     new QuestionDTO("What color is the sky?", ["Blue","Red","Yellow","Black"], 1),
//     new QuestionDTO("What color is matcha?", ["Green", "Blue", "Red", "Yellow"], 2)
// ]

export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        const questionsDTO: QuestionDTO[] = questions.map((q) => {
            return new QuestionDTO(q.question!, q.answers, q.id, q.img!);
        }) 
        res.status(200).json(questionsDTO)
    } catch (error) {
        res.status(500).send(error)
    }
}

// export const getQuestionById = (req: Request, res: Response) => {
//     const { id } = req.params    
//     try {
//         if(!id) {
//             res.status(400).json({status: "Question not found"})
//         } else {
//             res.status(200).json(questions)
//             console.log(id)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

export const addQuestion = async (req: Request, res: Response) => {
    const { id, question, answers } = req.body

    try {
        if (!id || !question || !answers) {
            res.status(400).json({error: "ALl fields are required"})
        } else {
            const newQuestion = await Question.create({
                id,
                question,
                answers,
            })
            res.status(201).json(newQuestion)
        }        
    } catch (error) {
        console.error(error);
    }
}