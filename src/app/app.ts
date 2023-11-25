import cors from 'cors';
import express, { Application, Request, Response } from 'express';

// ------------->> Initialization Application <<-----------
const app: Application = express();

// ------------>> Application Parsers <<----------------
app.use(cors());
app.use(express.json());

// -------------->> Application Routes <<----------------

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

export default app;
