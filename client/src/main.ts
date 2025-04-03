import { addQuestionForm, displayQuestion } from "./components/htmlHelpers";
import { Question } from "./models/Question";
import { getQuestions } from "./services/questionServices";

let questions: Question[] = []

document.getElementById("questions-list-button")?.addEventListener("click", async() => {
  console.log("Fetching questions")
  questions = await getQuestions()
  console.log(questions)
  const ul = document.createElement("ul")
    
  if (!questions || questions.length === 0) {
    console.error("No questions available")
    return
  }
  questions.forEach(question => {
    const li = document.createElement("li")
    li.innerHTML = question.question
    const deleteButton = document.createElement("button")
    ul.append(li, deleteButton)
  })
})

document.getElementById("start-quiz-button")?.addEventListener("click", async() => {
  console.log("Fetching questions")
  questions = await getQuestions()
  console.log(questions)
    
  if (!questions || questions.length === 0) {
    console.error("No questions available")
    return
  }
  questions.forEach(question => {
      displayQuestion(question)
  });
})

document.getElementById("add-question-button")?.addEventListener("click", () => {
  addQuestionForm();
});
