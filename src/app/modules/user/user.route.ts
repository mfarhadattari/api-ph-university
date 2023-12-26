import express from 'express';
import authValidator from '../../middlewares/authValidator';
import parseBodyFormData from '../../middlewares/parseBodyFormData';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/fileUpload';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';
import { updateUserStatusValidationSchema } from './user.validation';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// ------------->> Create A Student Route <<--------------- //
router.post(
  '/create-student',
  authValidator('admin'),
  upload.single('file'),
  parseBodyFormData,
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

// ------------->> Create A Faculty Route <<--------------- //
router.post(
  '/create-faculty',
  authValidator('admin'),
  upload.single('file'),
  parseBodyFormData,
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

// ------------->> Create A Admin Route <<--------------- //
router.post(
  '/create-admin',
  authValidator('admin'),
  upload.single('file'),
  parseBodyFormData,
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

// ------------->> Get me Route <<--------------- //
router.get(
  '/get-me',
  authValidator('admin', 'faculty', 'student'),
  UserControllers.getMe,
);

// ------------->> Update User Status Route <<--------------- //
router.patch(
  '/:id/update-status',
  authValidator('admin'),
  validateRequest(updateUserStatusValidationSchema),
  UserControllers.updateUserStatus,
);

// ---------->> Export User Routes <------------- //
export const UserRoutes = router;
