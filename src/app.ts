import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import todoListRoutes from "./routes/todoList.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api", todoListRoutes);

export default app;
