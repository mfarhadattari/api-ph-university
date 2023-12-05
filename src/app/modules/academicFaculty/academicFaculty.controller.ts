import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

// ---------------->> Create academic Faculty Controller <<--------------------
const createAcademicFaculty = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

// ---------------->> GET all academic Faculty Controller <<--------------------
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrieve successfully',
    data: result,
  });
});

// ---------------->> GET Single academic Faculty Controller <<--------------------
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrieve successfully',
    data: result,
  });
});

// ---------------->> Update academic Faculty Controller <<--------------------
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    body,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
