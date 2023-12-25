import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all students route <<----------------------
router.get('/', authValidator('admin'), StudentController.getAllStudents);

// ---------------->> Get Single students route <<----------------------
router.get('/:id', authValidator('admin'), StudentController.getSingleStudent);

// ---------------->> Delete students route <<----------------------
router.delete('/:id', authValidator('admin'), StudentController.deleteStudent);

// ---------------->> Update students route <<----------------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
