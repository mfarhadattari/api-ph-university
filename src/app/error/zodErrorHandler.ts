import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse, TErrorSources } from '../interface/error';

const zodErrorHandler = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';
  const errorSource: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default zodErrorHandler;
