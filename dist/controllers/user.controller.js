"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const response_1 = require("../utils/response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_model_1 = require("../models/user.model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_model_1.User.findOne({
            $or: [{ email: email }, { name: name }],
        });
        if (existingUser) {
            return (0, response_1.sendResponse)(res, 400, false, "User already exists");
        }
        const newUser = yield user_model_1.User.create({ name, email, password });
        (0, response_1.sendResponse)(res, 201, true, "User registered successfully", newUser);
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 500, false, "Server error", error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user)
            return (0, response_1.sendResponse)(res, 400, false, "Invalid email, Please register");
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return (0, response_1.sendResponse)(res, 400, false, "Invalid password, try again");
        const token = jsonwebtoken_1.default.sign({ id: user._id }, env_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        (0, response_1.sendResponse)(res, 200, true, "Login successful", { token });
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 500, false, "Server error", error);
    }
});
exports.loginUser = loginUser;
