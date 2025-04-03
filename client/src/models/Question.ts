import { Answers, NewAnswerDto } from "./Answers";


export interface Question {
    id: number
    question: string
    answers: Answers[]
    img?: string
}

export interface NewQuestionDto {
    question: string;
    answers: NewAnswerDto[];
    img?: string;
  }