/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../utils/appError';
import { Users } from '../user/user.model';
import { IStudent } from './student.interface';
import { Students } from './student.model';

// ----------------------->> Get All Student Service <<--------------------
const getAllStudentsFromDB = async (): Promise<IStudent[]> => {
  const result = await Students.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: 'academicFaculty',
  });
  return result;
};

// ----------------------->> Get All Student Service <<--------------------
const getSingleStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Students.findById(id).populate({
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

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFormDB,
};
