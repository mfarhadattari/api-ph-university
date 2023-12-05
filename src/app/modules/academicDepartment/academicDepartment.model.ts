import { Schema, model } from 'mongoose';
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

export const AcademicDepartments = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
