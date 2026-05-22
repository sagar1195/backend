import express, { response } from 'express';
import Task from '../models/task.models.js';
// import { auth } from '../middleware/auth.js';

export const taskRouter = express.Router();

taskRouter.get('/', async (request, response, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    response.json(tasks);
  } catch (error) {
    next(error);
  }
});

taskRouter.get('/:id', async (request, response, next) => {
  try {
    const task = await Task.findById(request.params.id);
    if (!task) return response.status(404).json({ message: 'Task not found' });
    response.json(task);
  } catch (error) {
    next(error);
  }
});
// taskRouter.use(auth);

taskRouter.post('/', async (request, response, next) => {
  try {
    const { name, description, dueDate, completed } = request.body;
    const task = new Task({
      name,
      description,
      dueDate,
      completed,
    });
    await task.save();
    response.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});

taskRouter.put('/:id', async (request, response, next) => {
  try {
    const { name, description, dueDate, completed } = request.body;
    const task = await Task.findByIdAndUpdate(
      request.params.id,
      { name, description, dueDate, completed },
      { new: true, runValidators: true },
    );
    if (!task) return response.status(404).json({ message: 'Task not found' });
    response.json({ task });
  } catch (error) {
    next(error);
  }
});

taskRouter.delete('/:id', async (request, response, next) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) return response.status(404).json({ message: 'Task not found' });
    response.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});
