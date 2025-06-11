import { checkAnswer } from "../helperFunctions/questionHelpers";
import { Question } from "../models/Question";

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