/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import handleError from '@utils/middlewares/handleError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`Service started on port ${process.env.PORT}!`);
});
