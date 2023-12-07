import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

// ----------------------->> Get All Student Controller <<--------------------
const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await StudentServices.getAllStudentsFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Student Controller <<--------------------
const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student retrieve successfully',
    data: result,
  });
});

// ----------------------->> Delete Student Controller <<--------------------
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFormDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

// ----------------------->> Update Student Controller <<--------------------
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
