import { Request, Response } from "express";
import { todoList as List } from "../models/todoList.model";
import { sendResponse } from "../utils/response";

export const createTodoList = async (req: Request, res: Response) => {
  try {
    const { id, task, status } = req.body;
    const existingTask = await List.findOne({ id });
    if (existingTask)
      return sendResponse(res, 404, false, "Already task exist");
    const newList = await List.create({ id, task, status });
    return sendResponse(res, 201, true, "Created Successfully", newList);
  } catch (error) {
    return sendResponse(res, 500, false, "Error in Creating TodoList", error);
  }
};

export const todoList = async (req: Request, res: Response) => {
  try {
    const todoList = await List.find({});
    return sendResponse(res, 201, true, "Fetched TodoList", todoList);
  } catch (error) {
    return sendResponse(res, 500, false, "Error in Fetching TodoList", error);
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedList = await List.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedList) {
      return sendResponse(res, 404, false, "Task not found");
    }

    return sendResponse(res, 200, true, "Updated Succesfully", updatedList);
  } catch (error) {
    return sendResponse(res, 500, false, "Error in Updating TodoList", error);
  }
};

export const deletetodoList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedtask = await List.findOneAndDelete({ id });
    if (!deletedtask) {
      return sendResponse(res, 404, false, "Task not found");
    }

    return sendResponse(res, 200, true, "deleted Succesfully", {
      id: deletedtask?.id,
    });
  } catch (error) {
    return sendResponse(res, 500, false, "Error in deleting TodoList", error);
  }
};
