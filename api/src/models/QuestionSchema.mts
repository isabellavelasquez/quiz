import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    id:{
        type: Number, 
        required: true
    },
    question: String, 
    answers: [String], 
    img: { 
        type: String 
    }
    
})

const Question = model("Question", questionSchema)

export default Question