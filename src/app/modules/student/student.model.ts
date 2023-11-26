import { Schema, model } from 'mongoose';
import { IGuardian, IName, IParents, IStudent } from './student.interface';

// --------------->> Name Schema  <<------------ //
const nameSchema = new Schema<IName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// --------------->> Parents Schema  <<------------ //
const parentsSchema = new Schema<IParents>(
  {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContact: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContact: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// --------------->> Guardian Schema  <<------------ //
const guardianSchema = new Schema<IGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// --------------->> Student Schema  <<------------ //
const studentSchema = new Schema<IStudent>(
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
    parents: {
      type: parentsSchema,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// --------------->> Student Model  <<------------ //
export const Student = model<IStudent>('Student', studentSchema);
