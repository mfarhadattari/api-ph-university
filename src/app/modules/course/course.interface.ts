import { Types } from 'mongoose';

export interface IPreRequisiteCourse {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface ICourse {
  title: string;
  prefix: string;
  code: string;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: IPreRequisiteCourse[];
}
