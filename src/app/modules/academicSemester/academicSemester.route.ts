import express from 'express';
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
  validateRequest(createAcademicSemesterValidationScheme),
  AcademicSemesterControllers.createAcademicSemester,
);

// ------------>> Get All Academic Semester Route <<------------
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

// ------------>> Get Single Academic Semester Route <<------------
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemesters);

// ------------>> Update Academic Semester Route <<------------
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterValidationScheme),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
