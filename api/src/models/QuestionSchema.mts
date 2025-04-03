import { Schema, model } from "mongoose";
import { answerSchema } from "./answerSchema.mjs";

const questionSchema = new Schema({
    id:{
        type: Number, 
        required: true
    },
    question: {
        type: String, 
        required: true
    },
    answers: {
        type: [answerSchema],
        required: true
    },
    img: String 
    
    
})

const Question = model("Question", questionSchema)

export default Question