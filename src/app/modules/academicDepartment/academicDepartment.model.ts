import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../error/AppError';
import { IAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.ObjectId,
    ref: 'AcademicFaculty',
  },
});

// --------------------->> Create Academic Department Middleware <<--------------------
academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartments.findOne({ name: this.name });
  if (isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Departments already exists',
    );
  }
  next();
});

// --------------------->> Update Academic Department Middleware <<--------------------
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExist = await AcademicDepartments.findOne(query);
  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Departments is not exist',
    );
  }
  next();
});

export const AcademicDepartments = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
