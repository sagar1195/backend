import express from "express";
import { notFonud } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./modules/auth/auth.routes.js";

const app = express();

/** Middleware */
app.use(express.json());

/** Routes */
app.get("/", (req, res) => {
  res.json({ message: "Home" });
});

app.use("/api/v1/", authRouter);

/** Not Found Error */
app.use(notFonud);

/** Error Handler */
app.use(errorHandler);

export default app;
