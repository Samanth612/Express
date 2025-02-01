import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { validateUser } from "../validators/user.validator";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);

export default router;
