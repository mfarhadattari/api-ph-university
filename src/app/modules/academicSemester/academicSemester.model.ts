import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../error/AppError';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);

// --------------->> Academic Semester Create Hook <<---------------------
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester Already Exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
