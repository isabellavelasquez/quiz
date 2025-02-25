export class Question {
    correctAnswer: number
    constructor(
        public question: string, 
        public answers: string[],
        public id: number,
        public img?: string
    ) {
        this.correctAnswer = 0;
    }
}