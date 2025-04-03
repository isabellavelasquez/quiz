import { AnswerDto } from "./AnswerDto.mjs"

export type QuestionDto = {
    id: number,
    question: string, 
    answers: AnswerDto[],
    img?: string
};

