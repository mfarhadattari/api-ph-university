/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { Users } from '../user/user.model';
import { facultySearchableField } from './faculty.const';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

// ----------------------->> Get All Faculty Service <<--------------------
const getAllFacultiesFromDB = async (
  query: Record<string, unknown>,
): Promise<IFaculty[]> => {
  const modelQuery = Faculty.find()
    .populate('academicFaculty')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  const FacultyQuery = new QueryBuilder(modelQuery, query)
    .search(facultySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FacultyQuery.modelQuery;
  return result;
};

// ----------------------->> Get Single Faculty Service <<--------------------
const getSingleFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

// ----------------------->> Delete Faculty Service <<--------------------
const deleteFacultyFormDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    const deletedUser = await Users.findByIdAndUpdate(
      deletedFaculty.userId,
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

// ----------------------->> Update Faculty Service <<--------------------
const updateFacultyIntoDB = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const { name, ...remainingFacultyInfo } = payload;
  const modifiedFaculty: Record<string, unknown> = { ...remainingFacultyInfo };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFaculty[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedFaculty, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFormDB,
  updateFacultyIntoDB,
};
