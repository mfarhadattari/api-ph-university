import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';

// initialize router
const router = express.Router();

// ----------------->> Create Semester Registration Route <<----------------
router.post(
  '/',
  authValidator('admin'),
  validateRequest(createSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// ---------------->> Get all Semester Registration Route <<----------------------
router.get(
  '/',
  authValidator('admin'),
  SemesterRegistrationControllers.getAllSemesterRegistration,
);

// ---------------->> Get Single Semester Registration Route <<----------------------
router.get(
  '/:id',
  authValidator('admin'),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

// ---------------->> Update Semester Registration Route <<----------------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

// ---------------->> Delete Semester Registration Route <<----------------------
router.delete(
  '/:id',
  authValidator('admin'),
  SemesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
