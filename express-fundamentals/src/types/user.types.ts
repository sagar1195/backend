import { Document } from 'mongoose';

export interface ITask extends Document {
  name: String;
  description?: String;
  dueDate?: Date;
  completed: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
