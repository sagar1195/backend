import express from 'express';

export const logger = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  console.log(
    `${request.method} ${request.path} - ${new Date().toISOString()}`,
  );
  next();
};
