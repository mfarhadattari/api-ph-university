import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

// ----------------------->> Get All Student Controller <<--------------------
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

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

export const StudentController = {
  getAllStudents,
  getSingleStudent,
};
