import express from 'express';
import { StudentController } from './student.controller';

// initialize router
const router = express.Router();

// ---------------->> Get all students route <<----------------------
router.get('/', StudentController.getAllStudents);

// ---------------->> Get Single students route <<----------------------
router.get('/:id', StudentController.getSingleStudent);

export const StudentRoutes = router;
