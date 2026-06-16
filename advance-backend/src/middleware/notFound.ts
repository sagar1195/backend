import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/error.util.js";

export const notFonud = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`cannot find ${req.method} ${req.originalUrl}`));
};
