import { Request, Response } from "express"
import { QuestionDto } from "../models/QuestionDto.mjs"
import Question from "../models/questionSchema.mjs";
import { InferSchemaType } from "mongoose";
import { AnswerDto } from "../models/AnswerDto.mjs";

type QuestionType = InferSchemaType<typeof Question.schema>

const convertDbQuestionToDto = (dbQuestion: QuestionType): QuestionDto => {
    return {
        id: dbQuestion.id, 
        question: dbQuestion.question, 
        answers: dbQuestion.answers.map(
            (a) => ({ id: a.id, text: a.text, isCorrect: a.isCorrect} satisfies AnswerDto)
        ),
    } satisfies QuestionDto
}

export const getQuestions = async (req: Request, res: Response) => {
    const questions = await Question.find()
    const questionsDtos: QuestionDto[] = questions.map((q) => convertDbQuestionToDto(q))
    return questionsDtos.filter(
        (q) => q.question.indexOf(q.toString()) >= 0
    )
}

export const addQuestion = async (question: QuestionDto): Promise<QuestionDto> => {
     
    const newQuestion: QuestionType = await Question.create({
        id: Date.now(),
        question: question.question,
        answers: question.answers
    }) satisfies QuestionType;

    const convertedQuestion = convertDbQuestionToDto(newQuestion)
    return convertedQuestion
}

export const deleteQuestion = async (id: number) => {
    await Question.deleteOne({id: id})
}