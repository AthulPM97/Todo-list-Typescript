import express from 'express';
import bodyParser from 'body-parser';

import todoRouter from './routes/todos';

const app = express();

app.use(bodyParser.json());

app.use(todoRouter);

app.listen(3000);