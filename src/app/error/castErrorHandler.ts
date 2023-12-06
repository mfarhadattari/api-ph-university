import mongoose from 'mongoose';
import { IGenericErrorResponse, TErrorSources } from '../interface/error';

const castErrorHandler = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Cast Error';
  const errorSource: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default castErrorHandler;
