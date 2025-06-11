import axios from "axios"
import { NewQuestionDto, Question } from "../models/Question";

export const getQuestions = async () => {
    try {
        const response = await axios.get('http://localhost:3000/question');
        return response.data.questions;
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

export const updateQuestion = async (updatedQuestion: Question) => {
    try {
        console.log("Updating question")
        const response = await axios.put("http://localhost:3000/question/" + String(updatedQuestion.id), updatedQuestion)   
        console.log("Question updated successfully" + JSON.stringify(response.data))
    } catch (error) {
        console.error(error)
    }
}

export const deleteQuestion = async (id: number) => {
    try {
        const response = await axios.delete("http://localhost:3000/question/" + id);
        console.log("Question deleted successfully" + response.data);
    } catch (error) {
        console.error(error);
    }
}