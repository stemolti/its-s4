import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import './utils/auth/auth-handlers';

const app = express();

const allowed = [
  'https://its-s4.vercel.app',       // produzione
  'https://its-s4-5it6.vercel.app',  // preview corrente
  'http://localhost:4200'            // sviluppo locale
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,               // se usi cookie / auth header
  })
);

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

export default app;
