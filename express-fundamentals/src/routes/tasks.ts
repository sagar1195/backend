import express from 'express';

import { auth } from '../middleware/auth.js';

export const taskRouter = express.Router();

taskRouter.get('/', (request, response) => {
  const search = request.query.search as string | undefined;
  if (search) {
    response.json({
      tasks: [
        {
          id: 1,
          title: `Search Result for ${search}`,
          completed: false,
        },
      ],
    });
  }
  response.json({
    tasks: [
      { id: 1, title: 'Learn Typescript', completed: true },
      { id: 2, title: 'Learn Express', completed: false },
    ],
  });
});

taskRouter.get('/:id', (request, response) => {
  const taskId = request.params.id;
  response.json({
    task: { id: taskId, title: `Task ${taskId}`, completed: true },
  });
});
taskRouter.use(auth);

taskRouter.post('/', (request, response) => {
  //   res.json({ task: { id: 3, title: "New task", completed: false } });
  const title = request.body.title;
  const completed = request.body.completed;
  response.json({ tasks: { title, completed } });
});

taskRouter.put('/:id', (request, response) => {
  const taskId = request.params.id;
  const title = request.body.title;
  const completed = request.body.completed;
  response.json({ tasks: { id: taskId, title, completed } });
});

taskRouter.delete('/:id', (request, response) => {
  const taskId = request.params.id;
  response.json({ message: `Task ${taskId} deleted` });
});
