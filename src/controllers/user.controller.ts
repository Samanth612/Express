import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import { sendResponse } from "../utils/response";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { User } from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser: any = await User.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (existingUser) {
      return sendResponse(res, 400, false, "User already exists");
    }

    const newUser = await User.create({ name, email, password });
    sendResponse(res, 201, true, "User registered successfully", newUser);
  } catch (error) {
    sendResponse(res, 500, false, "Server error", error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user)
      return sendResponse(res, 400, false, "Invalid email, Please register");

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return sendResponse(res, 400, false, "Invalid password, try again");

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    sendResponse(res, 200, true, "Login successful", { token });
  } catch (error) {
    sendResponse(res, 500, false, "Server error", error);
  }
};
