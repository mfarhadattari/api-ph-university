import mongoose from 'mongoose';
import { IGenericErrorResponse, TErrorSources } from '../interface/error';

const validationErrorHandler = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation Error';
  const errorSource: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default validationErrorHandler;
