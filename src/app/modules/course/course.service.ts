/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { courseSearchableFields } from './course.const';
import { ICourse, ICourseFaculty } from './course.interface';
import { CourseFaculty, Courses } from './course.model';

// ------------------>> Create Course Service <<-------------------
const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Courses.create(payload);
  return result;
};

// ------------------>> Get All Course Service <<-------------------
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const modelQuery = Courses.find().populate('preRequisiteCourses.course');
  const courseQuery = new QueryBuilder(modelQuery, query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

// ------------------>> Get Single Course Service <<-------------------
const getSingleCourseFromDB = async (id: string) => {
  const result = await Courses.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// ------------------>> Delete Course Service <<-------------------
const deleteCourseFromDB = async (id: string) => {
  const result = await Courses.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

// ------------------>> Update Course Service <<-------------------
const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // basic update
    const basicCourseUpdate = await Courses.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session: session,
      },
    );

    if (!basicCourseUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed');
    }

    // deleting preRequisite Course
    const deletedPrerequisite = preRequisiteCourses
      ?.filter((el) => el.isDeleted === true)
      .map((el) => el.course);

    const deletedPrerequisiteCourse = await Courses.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPrerequisite } },
        },
      },
      {
        upsert: true,
        session: session,
        runValidators: true,
      },
    );

    if (!deletedPrerequisiteCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed');
    }

    // add new preRequisiteCourse
    const newPreRequisite = preRequisiteCourses?.filter(
      (el) => !el.isDeleted === true,
    );

    const newPreRequisiteCourse = await Courses.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          preRequisiteCourses: {
            $each: newPreRequisite,
          },
        },
      },
      {
        runValidators: true,
        upsert: true,
        new: true,
        session: session,
      },
    );

    if (!newPreRequisiteCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed');
    }

    const result = await Courses.findById(id).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// ------------------>> Create Course Faculties Service <<-------------------
const createCourseFacultyIntoDB = async (
  courseId: string,
  payload: Partial<ICourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {
        faculties: {
          $each: payload.faculties,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

// ------------------>> Exporting Course Service <<-------------------
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  createCourseFacultyIntoDB,
};
