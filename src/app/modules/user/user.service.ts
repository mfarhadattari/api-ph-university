/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { AcademicSemesters } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Students } from '../student/student.model';
import { IUser } from './user.interface';
import { Users } from './user.model';
import { generateStudentId } from './user.utils';

// -------------------->> Create A Student Service <<-------------------
const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'student';

  // get academic semester
  const admissionSemester = await AcademicSemesters.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   setting user id
    userData.id = await generateStudentId(admissionSemester);

    //   creating a user --> transaction 1
    const newUser = await Users.create([userData], { session });

    //   creating student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    //   creating a student --> transaction 2
    const newStudent = await Students.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// -------------------->> Export Student Services <<-------------------
export const UserServices = {
  createStudentIntoDB,
};
