import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import './utils/auth/auth-handlers';

const app = express();

app.use(cors({
  origin: 'https://its-s4-5it6.vercel.app',
  credentials: true
}));

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

export default app;
