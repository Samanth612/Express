import express from "express";
import {
  createTodoList,
  deletetodoList,
  todoList,
  updateList,
} from "../controllers/todoList.controller";

const router = express.Router();

router.post("/createTodoList", createTodoList);
router.get("/todoList", todoList);
router.put("/updatetodolist/:id", updateList);
router.delete("/deletetodoList/:id", deletetodoList);

export default router;
