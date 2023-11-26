import { Types } from 'mongoose';

// --------------->> Name Interface  <<------------ //
export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// --------------->> Parents Interface  <<------------ //
export interface IParents {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
}

// --------------->> Guardian Interface  <<------------ //
export interface IGuardian {
  name: string;
  occupation: string;
  contact: string;
  relation: string;
}

// --------------->> Student Interface  <<------------ //
export interface IStudent {
  id: string;
  userId: Types.ObjectId;
  name: IName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contractNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  parents: IParents;
  guardian: IGuardian;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
