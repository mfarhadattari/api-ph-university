import express from 'express';
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
  validateRequest(createCourseValidationSchema),
  CourseControllers.createCourse,
);

// ---------------->> Get all course route <<----------------------
router.get('/', CourseControllers.getAllCourses);

// ---------------->> Get Single course route <<----------------------
router.get('/:id', CourseControllers.getSingleCourse);

// ---------------->> Delete course route <<----------------------
router.delete('/:id', CourseControllers.deleteCourse);

// ---------------->> Update course route <<----------------------
router.put(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// ---------------->> Create course Faculties route <<----------------------
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseFacultyValidationSchema),
  CourseControllers.createCourseFaculties,
);

// ---------------->> Remove course Faculties route <<----------------------
router.put(
  '/:courseId/remove-faculties',
  validateRequest(courseFacultyValidationSchema),
  CourseControllers.removeCourseFaculties,
);

export const CourseRoutes = router;
