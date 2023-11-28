import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { createAcademicSemesterValidationScheme } from './academicSemester.validation';

const router = express.Router();

// ------------>> Create Academic Semester Route <<------------
router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationScheme),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
