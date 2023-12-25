/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { UserRole } from './user.const';

export interface IUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExistByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    planPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    changePasswordTimestamps: Date,
    tokenIssueTime: number,
  ): boolean;
}

export type TUserRole = keyof typeof UserRole;
