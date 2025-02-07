"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todoListSchema = new mongoose_1.default.Schema({
    id: { type: String, require: true, unique: true },
    task: { type: String, require: true, unique: true },
    status: { type: String, require: true },
});
exports.todoList = mongoose_1.default.model("todoList", todoListSchema);
