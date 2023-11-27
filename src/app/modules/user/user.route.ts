import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
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

// ---------->> Export User Routes <------------- //
export const UserRoutes = router;
