import { NewQuestionDto, Question } from "../models/Question"
import { checkAnswer } from "../helpers/questionHelpers"
import { NewAnswerDto } from "../models/Answers";
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

export const displayQuestion = (question: Question) => {
    console.log(question);
    const questionContainer = document.getElementById("question-container");
    if (!questionContainer) {
        console.error("Error: Question container not found.");
        return
    };
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = question.question;

    const answersUl = document.getElementById("answers-ul");
    if (!question.answers) {
        console.error("Error: Answers did not return a valid array.");
        return  
    };
    if(!answersUl) {
        console.error("Error: Answers ul not found.");
        return
    };
    answersUl.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const answerLi = document.createElement("li");
        const answerBtn = document.createElement("button");
        answerBtn.innerHTML = answer;
        answersUl.append(answerLi);
        answerLi.append(answerBtn);
        answerBtn.addEventListener("click", () => {
            checkAnswer(question, index);
        });
    });
};

export const removeQuestionFromList = () => {

}