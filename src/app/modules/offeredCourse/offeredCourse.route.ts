import express from 'express';
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
  validateRequest(createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

// ---------------->> Get all Offered Course Route <<----------------------
router.get('/', OfferedCourseControllers.getAllOfferedCourse);

// ---------------->> Get Single Offered Course Route <<----------------------
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

// ---------------->> Update Offered Course Route <<----------------------
router.patch(
  '/:id',
  validateRequest(updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

// ---------------->> Delete Offered Course Route <<----------------------
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB);

export const OfferedCourseRoutes = router;
