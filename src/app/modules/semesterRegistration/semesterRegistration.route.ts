import express from 'express';
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
  validateRequest(createSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// ---------------->> Get all Semester Registration Route <<----------------------
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

// ---------------->> Get Single Semester Registration Route <<----------------------
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

// ---------------->> Update Semester Registration Route <<----------------------
router.patch(
  '/:id',
  validateRequest(updateSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

// ---------------->> Delete Semester Registration Route <<----------------------
router.delete(
  '/:id',
  SemesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
