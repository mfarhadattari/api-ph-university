import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

// ----------------->> Create Semester Registration Controller <<----------------
const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Semester registration successfully',
    data: result,
  });
});

// ----------------------->> Get All Semester Registration Controller <<--------------------
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Semester Registration Controller <<--------------------
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const semesterRegistrationId = req.params.id;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      semesterRegistrationId,
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration retrieve successfully',
    data: result,
  });
});

// ----------------------->> Update Semester Registration Controller <<--------------------
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const semesterRegistrationId = req.params.id;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      semesterRegistrationId,
      req.body,
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration updated successfully',
    data: result,
  });
});

// ----------------------->> Delete Semester Registration Controller <<--------------------

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});

// ----------------->> Export Semester Registration Controller <<----------------
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
