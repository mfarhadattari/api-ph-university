/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// -------------------->> Create A Student Controller <<-------------------
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

// -------------------->> Export Student Controllers <<-------------------
export const UserControllers = {
  createStudent,
};
