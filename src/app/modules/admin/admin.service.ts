/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { adminSearchableField } from './admin.const';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

// ----------------------->> Get All Admin Service <<--------------------
const getAllAdminsFromDB = async (
  query: Record<string, unknown>,
): Promise<IAdmin[]> => {
  const modelQuery = Admin.find().populate({
    path: 'managementDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  const AdminQuery = new QueryBuilder(modelQuery, query)
    .search(adminSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AdminQuery.modelQuery;
  return result;
};

// ----------------------->> Get Single Admin Service <<--------------------
const getSingleAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate({
    path: 'managementDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

// ----------------------->> Delete Admin Service <<--------------------
const deleteAdminFormDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session: session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    const deletedUser = await User.findByIdAndUpdate(
      deletedAdmin.userId,
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

// ----------------------->> Update Admin Service <<--------------------
const updateAdminIntoDB = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const { name, ...remainingAdminInfo } = payload;
  const modifiedFaculty: Record<string, unknown> = { ...remainingAdminInfo };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFaculty[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedFaculty, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'managementDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteAdminFormDB,
  updateAdminIntoDB,
};
