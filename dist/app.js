"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todoList_routes_1 = __importDefault(require("./routes/todoList.routes"));
const response_1 = require("./utils/response");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/users", user_routes_1.default);
app.use("/api/todos", todoList_routes_1.default);
app.use((err, req, res, next) => {
    console.log("Error:", err.message);
    (0, response_1.sendResponse)(res, err.status || 500, false, err.message || "Internal Server Error");
});
exports.default = app;
