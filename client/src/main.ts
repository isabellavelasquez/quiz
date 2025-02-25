import { Question } from "./models/Questions";
import { getQuestions } from "./services/getQuestions";

const createHTML = (question: Question) => {
    const questionContainer = document.createElement("div")
    const answersContainer = document.createElement("ul")

    questionContainer.innerHTML = question.question

    document.getElementById("questions-container")?.append(questionContainer, answersContainer)

    if (!question.answers || !Array.isArray(question.answers)) {
        console.error("Error: Answers did not return a valid array.");
        return;
    }
    question.answers.forEach(answer => {
        const answerLi = document.createElement("li")
        answerLi.innerHTML = answer
        answersContainer.append(answerLi)
    });
}

document.getElementById("button")?.addEventListener("click", async() => {
    const questions = await getQuestions()
    console.log(questions)
    if (!questions || !Array.isArray(questions)) {
        console.error("Error: getQuestions() did not return a valid array.");
        return;
    }
    
    questions.forEach(question => {
        createHTML(question);
        console.log(question);
    });
})
