import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

  question_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }]
});

export default mongoose.model("Question", questionSchema);
