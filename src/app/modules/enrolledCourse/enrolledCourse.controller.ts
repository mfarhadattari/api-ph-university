import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

// ----------------->> Create Enrolled Course Controller <<----------------
const createCourseEnrolled = catchAsync(async (req, res) => {
  const id = req.user.id;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Course enrolled successfully',
    data: result,
  });
});

// ----------------->> Export Enrolled Course  Controller <<----------------
export const EnrolledCourseControllers = {
  createCourseEnrolled,
};
