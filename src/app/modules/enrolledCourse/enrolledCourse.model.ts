import { Schema, model } from 'mongoose';
import { GRADE } from './enrolledCourse.const';
import { ICourseMarks, IEnrolledCourse } from './enrolledCourse.interface';

const courseMarksSchema = new Schema<ICourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    final: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<IEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'OfferedCourse',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: GRADE,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const EnrolledCourse = model<IEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
