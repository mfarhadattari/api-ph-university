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

// -------------------->> Create A Faculty Controller <<-------------------
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, faculty);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

// -------------------->> Create A Admin Controller <<-------------------
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await UserServices.createAdminIntoDB(password, admin);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

// -------------------->> Export Student Controllers <<-------------------
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
