import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/user.js";
import {
  firstLetterCapital,
  validateEmail,
  validatePassword,
} from "../helpers/validators.js";
import {
  generateTokens,
  verifyRefreshToken,
  refreshJwtToken,
} from "../middleware/token.js";

const SIGN_UP = async (req, res) => {
  try {
    if (!validatePassword(req.body.password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain at least one numeric digit",
      });
    }
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({
        message: "Email must be valid",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new UserModel({
      _id: uuidv4(),

      ...req.body,
    });
    console.log(user)
    
    user.name = firstLetterCapital(user.name);
    user.password = hash;
    const response = await user.save();
    const { jwt_token, refresh_token } = generateTokens(
      response.id,
      response.email
    );

    return res.status(200).json({
      message: `Account ${firstLetterCapital(
        req.body.name
      )} successfully created `,
      user: response,
      jwt_token: jwt_token,
      refresh_token: refresh_token,
    });
  } catch (err) {
    console.log("Handled ERROR:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};

const LOG_IN = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const { jwt_token, refresh_token } = generateTokens(user.id, user.email);
      return res.status(200).json({
        message: " User logged in",
        jwt_token: jwt_token,
        refresh_token: refresh_token,
      });
    } catch (err) {
      console.log("HANDLED ERROR:", err);
      return res.status(500).json({ message: "Error happened" });
    }
  };

export {SIGN_UP, LOG_IN}