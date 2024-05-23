import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";
import AnswerModel from "../models/answer.js";

const POST_CREATE_ANSWER = async (req, res) => {
  try {
    const userId = req.body.userId;

    const questionId = req.params.id;
    console.log(questionId);
    const question = await QuestionModel.findOne({ id: questionId });
    if (!question) {
      return res
        .status(404)
        .json({ message: "question not found", question: question });
    }
    const answer = new AnswerModel({
      id: uuidv4(),
      answer_text: req.body.answer_text,
      question_id: questionId,
      user_id: userId,
      date: new Date(),
      likes: [],
      dislikes: [],
    });
    const response = await answer.save();

    question.answers.push(answer.id);
    await question.save();
    res
      .status(200)
      .json({ status: "Question was added to the list", response: response });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};
const GET_ALL_ANSWERS = async (req, res) => {
  const questionId=req.params.id
  console.log(questionId)
  try {
    const answers = await AnswerModel.find({question_id:questionId}).sort({ date: -1 });
    return res.status(200).json({ status: "Success", answers: answers });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};
const DELETE_ANSWER_BY_ID = async (req, res) => {
  try {
    const answer = await AnswerModel.findOneAndDelete({ id: req.params.id });
    if (!answer) {
      return res
        .status(401)
        .json({ message: `Answer with such id ${req.params.id} not find` });
    }

    const question = await QuestionModel.findOne({ id: answer.question_id });
    if (question) {
      question.answers = question.answers.filter(
        (answerId) => answerId !== req.params.id
      );
      await question.save();
    }

    return res
      .status(200)
      .json({ message: "Success, answer was deleted", answer: answer });
  } catch (err) {
    console.log("HANDLED ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};

export { POST_CREATE_ANSWER, GET_ALL_ANSWERS, DELETE_ANSWER_BY_ID };
