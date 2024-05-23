import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question_title: { type: String, required: true, min: 6 },
  question_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
  region:{type:String,required:true, min:6},
  answers: [{ type: String, required: true }],
});

export default mongoose.model("Question", questionSchema);
