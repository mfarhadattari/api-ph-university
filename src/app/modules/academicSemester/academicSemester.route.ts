import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import {
  createAcademicSemesterValidationScheme,
  updateAcademicSemesterValidationScheme,
} from './academicSemester.validation';

const router = express.Router();

// ------------>> Create Academic Semester Route <<------------
router.post(
  '/',
  authValidator('admin'),
  validateRequest(createAcademicSemesterValidationScheme),
  AcademicSemesterControllers.createAcademicSemester,
);

// ------------>> Get All Academic Semester Route <<------------
router.get(
  '/',
  authValidator('admin'),
  AcademicSemesterControllers.getAllAcademicSemesters,
);

// ------------>> Get Single Academic Semester Route <<------------
router.get(
  '/:id',
  authValidator('admin'),
  AcademicSemesterControllers.getSingleAcademicSemesters,
);

// ------------>> Update Academic Semester Route <<------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateAcademicSemesterValidationScheme),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
