import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types/user.types.js';

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
      maxLength: [100, 'Task name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Task name cannot exceed 500 characters'],
    },
    dueDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
