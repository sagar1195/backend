import express from 'express';

export const auth = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  const apiKey = request.header('x-api-key');
  if (apiKey === 'mysecretkey') {
    // return res.status(401).json({ error: "Access denied" });
    next();
  } else {
    response.status(401).json({ error: 'Access denied. Invalid API key.' });
  }
};
