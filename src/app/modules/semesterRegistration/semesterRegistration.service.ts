import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicSemesters } from '../academicSemester/academicSemester.model';
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

  // validation UPCOMING => ONGOING => ENDED
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

// ----------------->> Export Semester Registration Service <<----------------
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
