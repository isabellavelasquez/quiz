import { Question } from "../models/Question"

export const checkAnswer = (question: Question, answer: number) => {
    if(answer === 0) {
        console.log("Correct")
    }
    else {
        console.log("Incorrect")
    }
}

export const createButton = (text: string) => {
    const button = document.createElement("button")
    button.innerHTML = text
    return button
}

export const displayError = (errorMessage :string) => {
    const pTag = document.createElement("p");
    pTag.innerHTML = errorMessage;

    document.body.appendChild(pTag);
}
