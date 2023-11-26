import { Response } from 'express';

interface ResponseData<T> {
  status: number;
  success: boolean;
  message?: string;
  data: T;
}

const sendResponse = <T>(res: Response, data: ResponseData<T>) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message || 'Success',
    data: data.data,
  });
};

export default sendResponse;
