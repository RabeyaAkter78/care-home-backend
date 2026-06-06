import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1', router);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Care Home Management Platform APIs!',
  });
});

// Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
