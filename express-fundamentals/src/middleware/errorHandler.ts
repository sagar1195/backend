import type { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../utils.js';

export const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }
  response.status(500).json({
    error: {
      message: getErrorMessage(error),
    },
  });
  next(error);
};
