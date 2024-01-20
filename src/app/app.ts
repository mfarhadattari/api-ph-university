import cookie from 'cookie-parser';
import cors from 'cors';
import express, {
  Application,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { config } from './config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';
import sendResponse from './utils/sendResponse';

// ------------->> Initialization Application <<-----------
const app: Application = express();

// ------------>> Application Parsers <<----------------
app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: [config.client_base_url as string],
    credentials: true,
  }),
);

// -------------->> Application Routes <<----------------
app.use('/api/v1', router);

// -------------->> Application Rote Controller <<----------------
const roteController: RequestHandler = (req: Request, res: Response) => {
  const data = {
    name: 'api-ph-university',
    description: 'Backend service of PH University',
    repo: 'https://github.com/mfarhadattari/api-ph-university.git',
    author: {
      name: 'Mohammad Farhad',
      email: 'mfarhad.dev@gmail.com',
      portfolio: 'https://mfarhad-dev.vercel.app',
      github: 'https://github.com/mfarhadattari',
    },
  };
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'PH University Server is running',
    data: data,
  });
};

//  -------------->> Application Rote Route <<----------------
app.get('/', roteController);

// --------------->> Global Error Handler <<--------------------
app.use(globalErrorHandler);

// ----------------->> Not Found Handler <<--------------------
app.use(notFound);

export default app;
