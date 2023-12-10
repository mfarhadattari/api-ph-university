import { Schema, model } from 'mongoose';
import { nameSchema } from '../student/student.model';
import { IAdmin } from './admin.interface';

// --------------->> Student Schema  <<------------ //
const adminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: nameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contractNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// --------------->> Faculty Model  <<------------ //
export const Admin = model<IAdmin>('Admin', adminSchema);
