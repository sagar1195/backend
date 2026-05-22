import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

export default mongoose;
