import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
  question_id: { type: String, required: true },
  likes_number: [{ type: String }],
  dislikes: [{ type: String }],
});

export default mongoose.model("Answer", answerSchema);
