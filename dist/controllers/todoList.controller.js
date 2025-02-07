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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletetodoList = exports.updateList = exports.todoList = exports.createTodoList = void 0;
const todoList_model_1 = require("../models/todoList.model");
const response_1 = require("../utils/response");
const createTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, task, status } = req.body;
        const existingTask = yield todoList_model_1.todoList.findOne({ id });
        if (existingTask)
            return (0, response_1.sendResponse)(res, 404, false, "Already task exist");
        const newList = yield todoList_model_1.todoList.create({ id, task, status });
        return (0, response_1.sendResponse)(res, 201, true, "Created Successfully", newList);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Error in Creating TodoList", error);
    }
});
exports.createTodoList = createTodoList;
const todoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoList = yield todoList_model_1.todoList.find({});
        return (0, response_1.sendResponse)(res, 201, true, "Fetched TodoList", todoList);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Error in Fetching TodoList", error);
    }
});
exports.todoList = todoList;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedList = yield todoList_model_1.todoList.findOneAndUpdate({ id }, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedList) {
            return (0, response_1.sendResponse)(res, 404, false, "Task not found");
        }
        return (0, response_1.sendResponse)(res, 200, true, "Updated Succesfully", updatedList);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Error in Updating TodoList", error);
    }
});
exports.updateList = updateList;
const deletetodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedtask = yield todoList_model_1.todoList.findOneAndDelete({ id });
        if (!deletedtask) {
            return (0, response_1.sendResponse)(res, 404, false, "Task not found");
        }
        return (0, response_1.sendResponse)(res, 200, true, "deleted Succesfully", {
            id: deletedtask === null || deletedtask === void 0 ? void 0 : deletedtask.id,
        });
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, false, "Error in deleting TodoList", error);
    }
});
exports.deletetodoList = deletetodoList;
