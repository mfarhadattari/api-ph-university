import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { UserRoutes } from './modules/user/user.route';

// ------------->> Initialization Application <<-----------
const app: Application = express();

// ------------>> Application Parsers <<----------------
app.use(cors());
app.use(express.json());

// -------------->> Application Routes <<----------------
app.use('/api/v1/users', UserRoutes);

// -------------->> Application Rote Route <<----------------
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'PH University Server is running.',
    data: {
      name: 'api-ph-university',
      description: 'Backend service of PH University',
      repo: 'https://github.com/mfarhadattari/api-ph-university.git',
      author: {
        name: 'Mohammad Farhad',
        email: 'mfarhad.dev@gmail.com',
        portfolio: 'https://mfarhad-dev.vercel.app',
        github: 'https://github.com/mfarhadattari',
      },
    },
  });
});

// --------------->> Global Error Handler <<--------------------
app.use(globalErrorHandler);

// ----------------->> Not Found Handler <<--------------------
app.use(notFound);

export default app;
