import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

// ----------------------->> Get All Faculty Controller <<--------------------
const getAllFaculties = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await FacultyServices.getAllFacultiesFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculties retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Faculty Controller <<--------------------
const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty retrieve successfully',
    data: result,
  });
});

// ----------------------->> Delete Faculty Controller <<--------------------
const deleteFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyServices.deleteFacultyFormDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

// ----------------------->> Update Faculty Controller <<--------------------
const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
