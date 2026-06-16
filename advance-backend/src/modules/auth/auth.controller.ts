import { Request, Response } from "express";
import { authService } from "./auth.service.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const user = await authService.register(
      req.body.name,
      req.body.email,
      req.body.password,
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  },
  login: async (req: Request, res: Response) => {
    const user = await authService.login(req.body.email, req.body.password);

    res.status(200).json({
      success: true,
      data: user,
    });
  },
};
