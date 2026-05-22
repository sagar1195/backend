import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import { taskRouter } from './routes/tasks.js';
import { connectToDatabase } from './config/db.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const port = Number.parseInt(process.env.PORT || '3000');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.use('/tasks', taskRouter);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server: ', error);
    process.exit(1);
  }
};

startServer();
