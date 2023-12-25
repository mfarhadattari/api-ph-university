import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './offeredCourse.controller';
import {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
} from './offeredCourse.validation';

// initialize router
const router = express.Router();

// ----------------->> Create Offered Course Route <<----------------
router.post(
  '/',
  authValidator('admin'),
  validateRequest(createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

// ---------------->> Get all Offered Course Route <<----------------------
router.get(
  '/',
  authValidator('admin'),
  OfferedCourseControllers.getAllOfferedCourse,
);

// ---------------->> Get Single Offered Course Route <<----------------------
router.get(
  '/:id',
  authValidator('admin'),
  OfferedCourseControllers.getSingleOfferedCourse,
);

// ---------------->> Update Offered Course Route <<----------------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

// ---------------->> Delete Offered Course Route <<----------------------
router.delete(
  '/:id',
  authValidator('admin'),
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const OfferedCourseRoutes = router;
