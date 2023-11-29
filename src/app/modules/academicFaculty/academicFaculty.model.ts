import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculties = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
