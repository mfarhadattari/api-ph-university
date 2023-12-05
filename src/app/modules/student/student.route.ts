import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all students route <<----------------------
router.get('/', StudentController.getAllStudents);

// ---------------->> Get Single students route <<----------------------
router.get('/:id', StudentController.getSingleStudent);

// ---------------->> Delete students route <<----------------------
router.delete('/:id', StudentController.deleteStudent);

// ---------------->> Update students route <<----------------------
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
