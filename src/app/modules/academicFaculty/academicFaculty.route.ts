import express from 'express';
import authValidator from '../../middlewares/authValidator';
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
  authValidator('superAdmin', 'admin'),
  validateRequest(createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

// -------->> Get All Academic Faculty Router <<------------ //
router.get(
  '/',
  authValidator('superAdmin', 'admin'),
  AcademicFacultyControllers.getAllAcademicFaculty,
);

// -------->> Get Single Academic Faculty Router <<------------ //
router.get(
  '/:id',
  authValidator('superAdmin', 'admin'),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

// -------->> Update Academic Faculty Router <<------------ //
router.patch(
  '/:id',
  authValidator('superAdmin', 'admin'),
  validateRequest(updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);

// ---------->> Export User Routes <------------- //
export const AcademicFacultyRoutes = router;
