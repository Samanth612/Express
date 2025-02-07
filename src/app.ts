import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import todoListRoutes from "./routes/todoList.routes";
import { sendResponse } from "./utils/response";
import { todoList as List } from "./models/todoList.model";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/todos", todoListRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const todos = await List.find({});
    res.render("todo", { todos });
  } catch (error) {
    sendResponse(res, 500, false, "Error fetching TodoList", error);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", err.message);
  sendResponse(
    res,
    err.status || 500,
    false,
    err.message || "Internal Server Error"
  );
});

export default app;
