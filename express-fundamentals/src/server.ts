// import { logger } from "./middleware/logger";
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { taskRouter } from './routes/tasks.js';

const app = express();
const port = Number.parseInt(process.env.PORT || '3000');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
// app.use(logger);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
