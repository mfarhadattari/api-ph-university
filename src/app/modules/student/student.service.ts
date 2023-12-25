/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { studentSearchableField } from './student.const';
import { IStudent } from './student.interface';
import { Students } from './student.model';

// ----------------------->> Get All Student Service <<--------------------
const getAllStudentsFromDB = async (
  query: Record<string, unknown>,
): Promise<IStudent[]> => {
  const modelQuery = Students.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  const studentQuery = new QueryBuilder(modelQuery, query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

// ----------------------->> Get Single Student Service <<--------------------
const getSingleStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Students.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

// ----------------------->> Delete Student Service <<--------------------
const deleteStudentFormDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Students.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
      deletedStudent.userId,
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// ----------------------->> Update Student Service <<--------------------
const updateStudentIntoDB = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const { name, parents, guardian, ...remainingStudentInfo } = payload;
  const modifiedStudent: Record<string, unknown> = { ...remainingStudentInfo };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }

  if (parents && Object.keys(parents).length) {
    for (const [key, value] of Object.entries(parents)) {
      modifiedStudent[`parents.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${key}`] = value;
    }
  }

  const result = await Students.findByIdAndUpdate(id, modifiedStudent, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFormDB,
  updateStudentIntoDB,
};
