"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoList_controller_1 = require("../controllers/todoList.controller");
const router = express_1.default.Router();
router.post("/todo", todoList_controller_1.createTodoList);
router.get("/todo", todoList_controller_1.todoList);
router.put("/todo/:id", todoList_controller_1.updateList);
router.delete("/todo/:id", todoList_controller_1.deletetodoList);
exports.default = router;
