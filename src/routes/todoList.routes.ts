import express from "express";
import {
  createTodoList,
  deletetodoList,
  todoList,
  updateList,
} from "../controllers/todoList.controller";

const router = express.Router();

router.post("/todo", createTodoList);
router.get("/todo", todoList);
router.put("/todo/:id", updateList);
router.delete("/todo/:id", deletetodoList);

export default router;
