import { TRole } from './user.interface';

export const UserRole = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
  superAdmin: 'superAdmin',
} as const;

export const ROLE: TRole[] = ['student', 'faculty', 'admin', 'superAdmin'];

export const UserStatus = ['in-progress', 'blocked'];
