/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// -------------------->> Create A Student Controller <<-------------------
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;
    const result = await UserServices.createStudentIntoDB(password, student);

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// -------------------->> Export Student Controllers <<-------------------
export const UserControllers = {
  createStudent,
};
