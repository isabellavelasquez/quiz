import axios from "axios"
import { NewQuestionDto, Question } from "../models/Question";

export const getQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:3000/question')
        return response.data
    } catch (error) {
        console.error("Failed to fetch questions");
    }
}

export const postQuestion = async (newQuestion: NewQuestionDto) => {
    try {
        console.log("posting the question")
        const response = await axios.post("http://localhost:3000/question", newQuestion)
        console.log("Question added successfully!", response.data)

    } catch (error) {
        console.error(error)
    }
}

export const deleteQuestion = async (question: Question, id: number) => {
    try {
        const response = await axios.delete("http://localhost:3000/question/" + id)
        console.log("Question deleted successfully" + question + response)
    } catch (error) {
        console.error(error);
    }
}