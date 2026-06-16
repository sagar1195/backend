import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authenticate, authController.login);

export default authRouter;
