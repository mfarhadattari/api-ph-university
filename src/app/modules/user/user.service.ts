/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

// -------------------->> Create A Student Service <<-------------------
const createStudentIntoDB = async (password: string, payload: IStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'student';
  // set user email
  userData.email = payload.email;

  // get academic semester
  const admissionSemester = await AcademicSemester.findById(
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
    const newUser = await User.create([userData], { session });

    //   creating student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    //   creating a student --> transaction 2
    const newStudent = await Student.create([payload], { session });

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

// -------------------->> Create A Faculty Service <<-------------------
const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'faculty';

  // set user email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   setting user id
    userData.id = await generateFacultyId();

    //   creating a user
    const newUser = await User.create([userData], { session });

    //   creating student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    //   creating a faculty
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// -------------------->> Create A Admin Service <<-------------------
const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //   setting password in user object
  userData.password = password || (config.default_password as string);

  //   set user role
  userData.role = 'admin';

  // set user email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //   setting user id
    userData.id = await generateAdminId();

    //   creating a user
    const newUser = await User.create([userData], { session });

    //   creating student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;

    //   creating a admin
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// -------------------->> Create A Admin Service <<-------------------
const getMeFromDB = async (payload: JwtPayload) => {
  const { id, role } = payload;
  let result;
  if (role === 'student') {
    result = await Student.findOne({ id })
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  } else if (role === 'faculty') {
    result = await Faculty.findOne({ id }).populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    });
  } else if (role === 'admin') {
    result = await Admin.findOne({ id }).populate({
      path: 'managementDepartment',
      populate: 'academicFaculty',
    });
  }

  return result;
};

// -------------------->> Update User Status Service <<-------------------
const updateUserStatusIntoDB = async (
  id: string,
  payload: { status: string },
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// -------------------->> Export User Services <<-------------------
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  updateUserStatusIntoDB,
};
