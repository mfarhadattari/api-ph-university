import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

// ----------------->> Create Offered Course Controller <<----------------
const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

// ----------------------->> Get All Offered Course Controller <<--------------------
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Offered Course Controller <<--------------------
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const offeredCourseId = req.params.id;
  const result =
    await OfferedCourseServices.getSingleOfferedCourseFromDB(offeredCourseId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course retrieve successfully',
    data: result,
  });
});

// ----------------------->> Update Offered Course Controller <<--------------------
const updateOfferedCourse = catchAsync(async (req, res) => {
  const offeredCourseId = req.params.id;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    offeredCourseId,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course updated successfully',
    data: result,
  });
});

// ----------------------->> Update Offered Course Controller <<--------------------
const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
  const offeredCourseId = req.params.id;
  const result =
    await OfferedCourseServices.deleteOfferedCourseFromDB(offeredCourseId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course deleted successfully',
    data: result,
  });
});

// ----------------->> Export Offered Course Controller <<----------------
export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
