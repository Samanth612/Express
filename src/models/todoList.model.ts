import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  task: { type: String, require: true, unique: true },
  status: { type: String, require: true },
});

export const todoList = mongoose.model("todoList", todoListSchema);
