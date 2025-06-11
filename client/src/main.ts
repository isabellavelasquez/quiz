import { addQuestionForm } from "./adminHtmlHelpers/addQuestionForm";
import { Question } from "./models/Question";
import { getQuestions } from "./services/questionServices";
import { displayQuestion } from "./userHtmlHelpers/displayQuestion";

let questions: Question[] = []

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
