import { createButton } from "../helperFunctions/questionHelpers";
import { Question } from "../models/Question";
import { deleteQuestion, getQuestions, updateQuestion } from "../services/questionServices";

let questions: Question[] = []

document.getElementById("questions-list-button")?.addEventListener("click", async() => {
  questions = await getQuestions()
  console.log(questions)
  const questionsContainer = document.createElement("div");
  document.body.appendChild(questionsContainer);

  if (!questions || questions.length === 0) {
    console.error("No questions available")
    return
  }
  questions.forEach(question => {
    const questionContainer = document.createElement("div");
    const questionInput = document.createElement("input");
    questionInput.innerHTML = question.question;

    const deleteButton = createButton("Delete");
    const editButton = createButton("Edit");
    
    questionsContainer.appendChild(questionContainer);
    questionContainer.appendChild(questionInput);
    const answerInputs: HTMLInputElement[] = [];

    question.answers.forEach(answer => {
      const answerInput = document.createElement("input");
      answerInput.innerHTML = answer.text;
      answerInputs.push(answerInput)
  
    });

    questionContainer.append(answerInputs, deleteButton, editButton);
    deleteButton.addEventListener("click", () => {
      deleteQuestion(question.id);
    })

    editButton.addEventListener("click", () => {
        const saveButton = createButton("Save")
        questionContainer.append(saveButton)  

        questionInput.disabled = false
        answerInputs.forEach(input => input.disabled = false)

        saveButton.addEventListener("click", async () => {
            questionInput.disabled = true
            answerInputs.forEach(input => input.disabled = true)
            const updatedQuestion: Question = {
                id: question.id,
                question: questionInput.value,
                answers: answerInputs.map((input) => input.value)
            }
            await updateQuestion(updatedQuestion)

    })            
    })
  })
})