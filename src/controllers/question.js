import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";

const POST_CREATE_QUESTION = async (req, res) => {
  try {
  const userId= req.body.userId
    const question = new QuestionModel({
      id: uuidv4(),
      question_title:req.body.question_title,
      question_text:req.body.question_text,
    user_id:userId
    });
    const response = await question.save();

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { questions: response.id } },
      { new: true, useFindAndModify: false }
    );
    res
      .status(200)
      .json({ status: "Question was added to the list", response: response });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};
const GET_ALL_QUESTIONS = async (req, res) => {
  try {
      const questions= await QuestionModel.find().sort({date:-1});
     return res.status(200).json({ status: "Success", questions: questions });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};
const GET_QUESTION_BY_ID = async (req, res) => {
  try {
      const question= await QuestionModel.findOne({id:req.params.id});
      if(!question){return res.status(401).json({ message:` Question not find with such id ${req.params.id}`, question: question })}
     return res.status(200).json({ status: "Success", question: question });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};
const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
      const deletedQuestion= await QuestionModel.findOneAndDelete({id:req.params.id});
      if(!deletedQuestion){return res.status(401).json({ message:` Question not find with such id ${req.params.id}`, deletedQuestion })}
     return res.status(200).json({ status: "Success", question: deletedQuestion });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};


export { POST_CREATE_QUESTION, GET_ALL_QUESTIONS, GET_QUESTION_BY_ID,DELETE_QUESTION_BY_ID };
