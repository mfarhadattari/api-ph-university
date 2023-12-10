import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

// ----------------------->> Create Course Controller <<--------------------
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// ----------------------->> Get All Course Controller <<--------------------
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CourseServices.getAllCourseFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Courses retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Course Controller <<--------------------
const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course retrieve successfully',
    data: result,
  });
});

// ----------------------->> Delete Course Controller <<--------------------
const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

// ----------------------->> Update Course Controller <<--------------------
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course Updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
};
