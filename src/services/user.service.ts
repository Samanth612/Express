import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
