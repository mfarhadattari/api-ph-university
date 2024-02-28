import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// -------->> Create Academic Department Router <<------------ //
router.post(
  '/',
  authValidator('superAdmin', 'admin'),
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// -------->> Get All Academic Department Router <<------------ //
router.get(
  '/',
  authValidator('superAdmin', 'admin'),
  AcademicDepartmentControllers.getAllAcademicDepartment,
);

// -------->> Get Single Academic Department Router <<------------ //
router.get(
  '/:id',
  authValidator('superAdmin', 'admin'),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

// -------->> Update Academic Department Router <<------------ //
router.patch(
  '/:id',
  authValidator('superAdmin', 'admin'),
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

// ---------->> Export User Routes <------------- //
export const AcademicDepartmentRoutes = router;
