import { Question } from "../models/Question"

export const checkAnswer = (question: Question, answer: number) => {
    if(answer === 0) {
        console.log("Correct")
    }
    else {
        console.log("Incorrect")
    }
}