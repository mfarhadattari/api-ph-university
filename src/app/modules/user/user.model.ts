import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      types: String,
      required: true,
    },
    password: {
      types: String,
      required: true,
    },
    needPasswordChange: {
      types: Boolean,
      default: true,
    },
    role: {
      types: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      types: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      types: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
