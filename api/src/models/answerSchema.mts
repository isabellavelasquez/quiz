import { Schema } from "mongoose";

export const answerSchema = new Schema ({
    id: {type: Date, require: true},
    text: {type: String, required: true},
    isCorrect: {type: Boolean, required: true}
});
