/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import { Users } from '../user/user.model';
import { searchableField } from './student.const';
import { IStudent } from './student.interface';
import { Students } from './student.model';

// ----------------------->> Get All Student Service <<--------------------
const getAllStudentsFromDB = async (
  query: Record<string, unknown>,
): Promise<IStudent[]> => {
  const result = Students.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });

  // -------------->> searching <<------------------
  const searchTerm = query.searchTerm || '';

  const searchingResult = result.find({
    $or: searchableField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // -------------->> filtering <<------------------
  const queryObject = { ...query };
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((field) => delete queryObject[field]);
  const filteredResults = searchingResult.find(queryObject);

  // ---------------->> Sorting <<----------------
  const sort = (query.sort as string)?.split(',')?.join(' ') || '-createdAt';
  const sortedResults = filteredResults.sort(sort);

  // ---------------->> Paginating <<----------------
  const limit = Number(query?.limit) || 10;
  const page = Number(query?.page) || 1;
  const skip = (page - 1) * limit;
  const paginatedResult = sortedResults.limit(limit).skip(skip);

  // ---------------->> Filed Filtering <<----------------
  const fields = (query?.fields as string)?.split(',')?.join(' ') || '-_v';
  const fieldFilteredResults = await paginatedResult.select(fields);

  return fieldFilteredResults;
};

// ----------------------->> Get Single Student Service <<--------------------
const getSingleStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Students.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

// ----------------------->> Delete Student Service <<--------------------
const deleteStudentFormDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Students.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await Users.findOneAndUpdate(
      { id },
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

  const result = await Students.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFormDB,
  updateStudentIntoDB,
};
