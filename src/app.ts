import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import todoListRoutes from "./routes/todoList.routes";
import { sendResponse } from "./utils/response";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/todos", todoListRoutes);

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
