import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all Faculties route <<----------------------
router.get('/', authValidator('admin'), FacultyController.getAllFaculties);

// ---------------->> Get Single Faculty route <<----------------------
router.get('/:id', authValidator('admin'), FacultyController.getSingleFaculty);

// ---------------->> Delete Faculty route <<----------------------
router.delete('/:id', authValidator('admin'), FacultyController.deleteFaculty);

// ---------------->> Update Faculty route <<----------------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = router;
