/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// -------------------->> Create A Student Controller <<-------------------
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const file = req.file;
  const result = await UserServices.createStudentIntoDB(
    file,
    password,
    student,
  );

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
  const file = req.file;
  const result = await UserServices.createFacultyIntoDB(
    file,
    password,
    faculty,
  );

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
  const file = req.file;
  const result = await UserServices.createAdminIntoDB(file, password, admin);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

// -------------------->> Get Me Controller <<-------------------
const getMe = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.getMeFromDB(user);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Profile information retrieved',
    data: result,
  });
});

// -------------------->> Update User Status Controller <<-------------------
const updateUserStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.updateUserStatusIntoDB(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

// -------------------->> Export Student Controllers <<-------------------
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  updateUserStatus,
};
