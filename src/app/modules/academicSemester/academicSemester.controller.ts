import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

// --------------------->> Create Academic Semester Controller <<-----------------
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

// --------------------->> Get all Academic Semester Controller <<-----------------
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all academic semesters',
    data: result,
  });
});

// --------------------->> Get Single Academic Semester Controller <<-----------------
const getSingleAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getSingleAcademicSemesterFromDB(
    req.params.id,
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve academic semesters',
    data: result,
  });
});

// --------------------->> Update Academic Semester Controller <<-----------------
const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.updateAcademicSemesterIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Updated Academic Semester Successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesters,
  updateAcademicSemester,
};
