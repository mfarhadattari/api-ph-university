import { Schema, model } from 'mongoose';
import {
  ICourse,
  ICourseFaculty,
  IPreRequisiteCourse,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourse>(
  {
    course: {
      type: Schema.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<ICourse>('Course', courseSchema);

const courseFacultySchema = new Schema<ICourseFaculty>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      unique: true,
    },
    faculties: {
      type: [Schema.Types.ObjectId],
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CourseFaculty = model<ICourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
