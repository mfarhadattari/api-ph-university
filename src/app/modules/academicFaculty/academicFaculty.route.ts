import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './academicFaculty.validation';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// -------->> Create Academic Faculty Router <<------------ //
router.post(
  '/',
  validateRequest(createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

// -------->> Get All Academic Faculty Router <<------------ //
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

// -------->> Get Single Academic Faculty Router <<------------ //
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);

// -------->> Update Academic Faculty Router <<------------ //
router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);

// ---------->> Export User Routes <------------- //
export const AcademicFacultyRoutes = router;
