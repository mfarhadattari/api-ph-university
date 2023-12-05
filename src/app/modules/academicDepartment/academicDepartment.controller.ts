import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

// ---------------->> Create academic department Controller <<--------------------
const createAcademicDepartment = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

// ---------------->> GET all academic department Controller <<--------------------
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department retrieve successfully',
    data: result,
  });
});

// ---------------->> GET Single academic department Controller <<--------------------
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department retrieve successfully',
    data: result,
  });
});

// ---------------->> Update academic department Controller <<--------------------
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(id, body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
