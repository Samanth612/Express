import app from "./app";
import { connectDB } from "./config/db";
import { config } from "./config/env";

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
