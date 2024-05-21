import Joi from "joi";

const UserSchema =Joi.object({
    name:Joi.string().required().min(3),
    email:Joi.string().required(),
    password:Joi.string().required(),
});

export default UserSchema;