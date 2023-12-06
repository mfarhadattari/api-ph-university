/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources } from '../interface/error';

const duplicateErrorHandler = (error: any) => {
  const match = error.message.match(/"([^"]+)"/);

  const errorSource: TErrorSources = [
    {
      path: '',
      message: `${match[1]} in already exist`,
    },
  ];

  return {
    statusCode: 400,
    message: 'Duplicate key error',
    errorSource,
  };
};

export default duplicateErrorHandler;
