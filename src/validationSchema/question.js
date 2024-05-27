import Joi from "joi";

const QuestionSchema =Joi.object({
    question_title:Joi.string().required().min(10),
    question_text:Joi.string().required().min(30),
    region:Joi.string().required(),
});

export default QuestionSchema;