/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicSemesters } from '../academicSemester/academicSemester.model';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { RegistrationStatus } from './semesterRegistration.const';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

// ----------------->> Create Semester Registration Service <<----------------
const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  // checking any upcoming or ongoing semesters registered
  const isAnyOngoingOrUpcoming = await SemesterRegistration.findOne({
    $or: [
      {
        status: RegistrationStatus.UPCOMING,
      },
      {
        status: RegistrationStatus.ONGOING,
      },
    ],
  });
  if (isAnyOngoingOrUpcoming) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isAnyOngoingOrUpcoming.status} course registered`,
    );
  }

  // checking academic semester existence
  const isAcademicSemesterExist = await AcademicSemesters.findById(
    payload.academicSemester,
  );

  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester is not exist');
  }

  // checking semester registration existence
  const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester: payload.academicSemester,
  });
  if (isSemesterAlreadyRegistered) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already registered');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

// ----------------->> Get All Semester Registration Service <<----------------
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const modelQuery = SemesterRegistration.find().populate('academicSemester');

  const semesterQuery = new QueryBuilder(modelQuery, query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterQuery.modelQuery;

  return result;
};

// ----------------->> Get Single Semester Registration Service <<----------------
const getSingleSemesterRegistrationFromDB = async (
  semesterRegistrationId: string,
) => {
  const result = await SemesterRegistration.findById(semesterRegistrationId);
  return result;
};

// ----------------->> Update Semester Registration Service <<----------------
const updateSemesterRegistrationIntoDB = async (
  semesterRegistrationId: string,
  payload: Partial<ISemesterRegistration>,
) => {
  // checking semester registration exist
  const isSemesterRegistrationAlreadyExist =
    await SemesterRegistration.findById(semesterRegistrationId);
  if (!isSemesterRegistrationAlreadyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not exist');
  }

  // checking registered semester is ended
  const currentSemesterStatus = isSemesterRegistrationAlreadyExist.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This semester is already ended',
    );
  }

  // valsemesterRegistrationIdation UPCOMING => ONGOING => ENDED
  const requestedStatus = payload?.status;
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot update status UPCOMING to ENDED',
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot update status ONGOING to UPCOMING',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(
    semesterRegistrationId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

// ----------------->> Delete Semester Registration Service <<----------------
const deleteSemesterRegistrationFromDB = async (
  semesterRegistrationId: string,
) => {
  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistrationId,
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: semesterRegistrationId,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(semesterRegistrationId, {
        session,
        new: true,
      });

    if (!deletedSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// ----------------->> Export Semester Registration Service <<----------------
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
