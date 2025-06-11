import { NewAnswerDto } from "../models/Answers";
import { NewQuestionDto } from "../models/Question";
import { postQuestion } from "../services/questionServices";

export const addQuestionForm = () => {
    const answersList: NewAnswerDto[] = [];

    const form = document.getElementById("add-question-form");
    if (!form) return;
    form.innerHTML = "";

    const questionInputField = document.createElement("input");
    questionInputField.placeholder = "Enter question";

    const plusButton = document.createElement("button");
    plusButton.innerHTML = "+";

    const addButton = document.createElement("button");
    addButton.innerHTML = "Add question and answers to database";

    const answersContainer = document.createElement("div");

    form.append(questionInputField, plusButton, answersContainer, addButton);

    plusButton.addEventListener("click", (e) => {
        e.preventDefault();
        const answerInput = document.createElement("input");
        const checkbox = document.createElement("input");
        const saveButton = document.createElement("button");

        answerInput.placeholder = "Answer";
        saveButton.innerHTML = "Save";
        checkbox.type = "checkbox";

        answersContainer?.append(answerInput, checkbox, saveButton); 

        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            answerInput.disabled = true;
            const newAnswer: NewAnswerDto = {                
                text: answerInput.value,
                isCorrect: checkbox.checked
            };
            answersList.push(newAnswer);
        })
    });

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const newQuestion: NewQuestionDto = {
            question: questionInputField.value,
            answers: answersList
        };
        console.log("Registered question, sending to database" + JSON.stringify(newQuestion));
        postQuestion(newQuestion);
    });
};
