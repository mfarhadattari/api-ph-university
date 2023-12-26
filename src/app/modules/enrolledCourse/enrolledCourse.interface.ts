import { Types } from 'mongoose';

export interface ICourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  final: number;
}

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export interface IEnrolledCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: ICourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
}
