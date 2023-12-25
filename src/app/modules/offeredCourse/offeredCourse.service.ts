import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

// ----------------->> Create Offered Course Service <<----------------
const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    endTime,
    startTime,
  } = payload;

  // check semester registration exist
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  // check academic department exist
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  // check academic Faculty exist
  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }
  // check course exist
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  // check Faculty exist
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // set academic semester
  payload.academicSemester = isSemesterRegistrationExist.academicSemester;

  // matching academic department and academic faculty
  const isAcademicDepartmentAndFacultyMatch = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isAcademicDepartmentAndFacultyMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `"${isAcademicDepartmentExist.name}" is not belong to "${isAcademicFacultyExist.name}"`,
    );
  }

  // checking offered course already exists with same section, same semester registration and same course
  const isOfferedCourseAlreadyExistsWithSame = await OfferedCourse.findOne({
    section,
    semesterRegistration,
    course,
  });

  if (isOfferedCourseAlreadyExistsWithSame) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist`,
    );
  }

  // checking faculty schedule
  const facultyExistingSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(facultyExistingSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available for this time, choose another time`,
    );
  }

  const result = await OfferedCourse.create(payload);
  return result;
};

// ----------------->> Get All Offered Course Service <<----------------
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const modelQuery = OfferedCourse.find().populate(
    'SemesterRegistration academicSemester academicFaculty academicDepartment course faculty',
  );

  const offeredCourseQuery = new QueryBuilder(modelQuery, query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

// ----------------->> Get Single Offered Course Service <<----------------
const getSingleOfferedCourseFromDB = async (offeredCourseId: string) => {
  const result = await OfferedCourse.findById(offeredCourseId);
  return result;
};

// ----------------->> Update Offered Course Service <<----------------
const updateOfferedCourseIntoDB = async (
  offeredCourseId: string,
  payload: Pick<IOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  // checking offered course is exist
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourseId);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }
  // checking faculty is exist
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  // Checking the status of the semester registration
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // checking faculty schedule
  const facultyExistingSchedules = await OfferedCourse.find({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(facultyExistingSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available for this time, choose another time`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(
    offeredCourseId,
    payload,
    {
      new: true,
    },
  );
  return result;
};

// ----------------->> Delete Offered Course Service <<----------------
const deleteOfferedCourseFromDB = async (offeredCourseId: string) => {
  // check if the offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourseId);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  // check if the semester registration status is upcoming
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(offeredCourseId);

  return result;
};

// ----------------->> Export Offered Course Service <<----------------
export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
