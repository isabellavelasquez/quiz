import { Question } from "./models/Questions";
import { getQuestions } from "./services/getQuestions";

let questions: Question[] = []
let currentQuestionIndex = questions[0]

const checkAnswer = (question: Question, answer: number) => {
    if(answer === question.correctAnswer) {
        console.log("Correct")
    }
    else {
        console.log("Incorrect")
    }
}

const displayQuestion = (question: Question) => {
    const questionContainer = document.getElementById("question-container")
    if (!questionContainer) {
        console.error("Error: Question container not found.");
        return;
    }
    questionContainer.innerHTML = ""    
    questionContainer.innerHTML = question.question

    const answersUl = document.getElementById("answers-ul")
    if (!question.answers || !Array.isArray(question.answers)) {
        console.error("Error: Answers did not return a valid array.");
        return;
    }
    if(!answersUl) {
        console.error("Error: Answers ul not found.");
        return;
    }
    answersUl.innerHTML = ""  
    question.answers.forEach((answer, index) => {
        const answerLi = document.createElement("li")
        const answerBtn = document.createElement("button")
        answerBtn.innerHTML = answer
        answersUl.append(answerLi)
        answerLi.append(answerBtn)
        answerBtn.addEventListener("click", () => {
            checkAnswer(question, index)
        })
    });
}

document.getElementById("button")?.addEventListener("click", async() => {
    questions = await getQuestions()
    
    questions.forEach(question => {
        displayQuestion(question);
    });
})
