import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { sendResponse } from "../utils/response";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return sendResponse(
      res,
      400,
      false,
      "Validation error",
      validation.error.errors
    );
  }
  next();
};
