import { Types } from 'mongoose';
import { IName } from '../student/student.interface';

export interface IAdmin {
  id: string;
  userId: Types.ObjectId;
  designation: string;
  name: IName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contractNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  managementDepartment: Types.ObjectId;
  isDeleted: boolean;
}
