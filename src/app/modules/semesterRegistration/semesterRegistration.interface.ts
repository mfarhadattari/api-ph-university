import { Types } from 'mongoose';

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  minCredits: number;
  maxCredits: number;
}
