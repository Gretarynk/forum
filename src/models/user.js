import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    _id:{type:String, required:true},
    name: { type: String, required: true, min: 3 },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      questions: [{ type: String }]
})


export default mongoose.model("User", userSchema);