/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { Course } from '../course/course.model';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Student } from '../student/student.model';
import { IEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';

// ----------------->> Create Enrolled Course Service <<----------------
const createEnrolledCourseIntoDB = async (
  id: string,
  payload: IEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  // check offered course exist
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const {
    faculty,
    course,
    academicDepartment,
    academicFaculty,
    academicSemester,
    semesterRegistration,
    maxCapacity,
  } = isOfferedCourseExists;

  // check student is exist
  const student = await Student.findOne({ id }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  // check student already enrolled courses
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !');
  }

  // check total credits exceeds maxCredits
  const courseData = await Course.findById(course);
  const currentCredits = courseData?.credits;

  const semesterRegistrationData =
    await SemesterRegistration.findById(semesterRegistration).select(
      'maxCredits',
    );

  const maxCredits = semesterRegistrationData?.maxCredits;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCoursesData',
      },
    },
    {
      $unwind: '$enrolledCoursesData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: {
          $sum: '$enrolledCoursesData.credits',
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalEnrolledCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  const totalCredits = totalEnrolledCredits + currentCredits;

  if (totalCredits && maxCredits && totalCredits > maxCredits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration,
          academicSemester,
          academicFaculty,
          academicDepartment,
          offeredCourse,
          course,
          student: student._id,
          faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course !',
      );
    }

    // decrease max capacity
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// ----------------->> Export Enrolled Course  Service <<----------------
export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
