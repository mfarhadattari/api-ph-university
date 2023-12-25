import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import {
  courseFacultyValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';

// initialize router
const router = express.Router();

// ---------------->> create course route <<----------------------
router.post(
  '/',
  authValidator('admin'),
  validateRequest(createCourseValidationSchema),
  CourseControllers.createCourse,
);

// ---------------->> Get all course route <<----------------------
router.get('/', authValidator('admin'), CourseControllers.getAllCourses);

// ---------------->> Get Single course route <<----------------------
router.get('/:id', authValidator('admin'), CourseControllers.getSingleCourse);

// ---------------->> Delete course route <<----------------------
router.delete('/:id', authValidator('admin'), CourseControllers.deleteCourse);

// ---------------->> Update course route <<----------------------
router.put(
  '/:id',
  authValidator('admin'),
  validateRequest(updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// ---------------->> Create course Faculties route <<----------------------
router.put(
  '/:courseId/assign-faculties',
  authValidator('admin'),
  validateRequest(courseFacultyValidationSchema),
  CourseControllers.createCourseFaculties,
);

// ---------------->> Remove course Faculties route <<----------------------
router.put(
  '/:courseId/remove-faculties',
  authValidator('admin'),
  validateRequest(courseFacultyValidationSchema),
  CourseControllers.removeCourseFaculties,
);

export const CourseRoutes = router;
