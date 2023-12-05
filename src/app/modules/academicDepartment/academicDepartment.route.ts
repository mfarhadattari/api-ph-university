import express from 'express';
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
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// -------->> Get All Academic Department Router <<------------ //
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

// -------->> Get Single Academic Department Router <<------------ //
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment);

// -------->> Update Academic Department Router <<------------ //
router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

// ---------->> Export User Routes <------------- //
export const AcademicDepartmentRoutes = router;
