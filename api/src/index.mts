import express from "express"
import { Question } from "./models/Question.mjs"
import cors from "cors"

const app = express()

app.use(cors())

const questions: Question[] = [
    new Question("abmdfndfm", ["7","4","6","5"], 1),
    new Question("keepppppp", ["abc", "bgv", "wrc", "sdg"], 2)
]

app.get("/questions", (req, res) => {
    try {
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/questions/:id", (req, res) => {
    const { id } = req.params
    
    try {
        if(!id) {
            res.status(400).json({status: "Question not found"})
        } else {
            res.status(200).json(questions)
            console.log(id)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/ping",(_, res) => {
    res.status(200).json({status: "Alive"})
})


app.listen(3000, (error) => {
    if(error) {
        console.error(error)
    } else {
        console.log("Api is running on port 3000")
    }
})