import { Request, Response } from "express"
import { QuestionDto } from "../models/QuestionDto.mjs";
import Question from "../models/QuestionSchema.mjs";
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

export const getQuestions = async () => {
    const questions = await Question.find()
    const questionsDtos: QuestionDto[] = questions.map((q) => convertDbQuestionToDto(q))
    return questionsDtos
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

export const updateQuestion = async (id: Number, question: QuestionDto) => {
    const updatedQuestion = await Question.findOneAndUpdate(
        { id: Number(question.id) },
        { 
            question: question.question,
            answers: question.answers
        },
        { new: true }
    );

    if (!updatedQuestion) throw Error("Question not found with id " + id);
    
    return convertDbQuestionToDto(updatedQuestion);    
}

export const deleteQuestion = async (id: number) => {
    await Question.deleteOne({id: id})
}