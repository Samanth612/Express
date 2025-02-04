import { User } from "../models/user.model";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
