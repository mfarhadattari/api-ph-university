import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { createEnrolledCourseValidationZodSchema } from './enrolledCourse.validation';

// initialize router
const router = express.Router();

// ----------------->> Create Enrolled Course  Route <<----------------
router.post(
  '/',
  authValidator('student'),
  validateRequest(createEnrolledCourseValidationZodSchema),
  EnrolledCourseControllers.createCourseEnrolled,
);

export const EnrolledCourseRoutes = router;
