import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    /** graceful close */
    process.on("SIGINT", async () => {
      console.log("Shutting down...");
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
