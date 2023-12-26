import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
} from './enrolledCourse.validation';

// initialize router
const router = express.Router();

// ----------------->> Create Enrolled Course  Route <<----------------
router.post(
  '/',
  authValidator('student'),
  validateRequest(createEnrolledCourseValidationZodSchema),
  EnrolledCourseControllers.createCourseEnrolled,
);

// ----------------->> Update Enrolled Course Mark  Route <<----------------
router.patch(
  '/update-enrolled-course-marks',
  authValidator('faculty'),
  validateRequest(updateEnrolledCourseMarksValidationZodSchema),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
