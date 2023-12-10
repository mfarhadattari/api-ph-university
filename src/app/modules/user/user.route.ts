import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// ------------->> Create A Student Route <<--------------- //
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

// ------------->> Create A Faculty Route <<--------------- //
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

// ------------->> Create A Admin Route <<--------------- //
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

// ---------->> Export User Routes <------------- //
export const UserRoutes = router;
