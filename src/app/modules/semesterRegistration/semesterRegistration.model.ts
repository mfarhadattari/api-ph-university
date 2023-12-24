import { Schema, model } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.const';
import { ISemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredits: {
      type: Number,
      default: 3,
    },
    maxCredits: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<ISemesterRegistration>(
  'semesterRegistration',
  semesterRegistrationSchema,
);
