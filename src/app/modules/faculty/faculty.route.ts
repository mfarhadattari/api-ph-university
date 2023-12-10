import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all Faculties route <<----------------------
router.get('/', FacultyController.getAllFaculties);

// ---------------->> Get Single Faculty route <<----------------------
router.get('/:id', FacultyController.getSingleFaculty);

// ---------------->> Delete Faculty route <<----------------------
router.delete('/:id', FacultyController.deleteFaculty);

// ---------------->> Update Faculty route <<----------------------
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = router;
