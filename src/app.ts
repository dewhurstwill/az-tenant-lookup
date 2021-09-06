// Node Modules
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
//import * as dotenv from 'dotenv';

const logger = morgan;

//dotenv.config();

// Importing custom middleware
import { notFound, errorHandler } from './middlewares';

// Importing API routes
import api from './api';

const app = express();

// Configuring middleware in express
app.use(logger('dev', {
  skip: (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
      return res.statusCode < 400;
    }
    return false;
  }
}));
app.use(helmet());
app.use(cors({
  origin: 'https://az-tenant-lookup-willdewhurst.vercel.app',
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Adding imported routes to express
app.use('/', api);

// Adding imported, custom middleware to express
app.use(notFound);
app.use(errorHandler);

export default app;
