import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all Admins route <<----------------------
router.get('/', authValidator('admin'), AdminController.getAllAdmins);

// ---------------->> Get Single Admin route <<----------------------
router.get('/:id', authValidator('admin'), AdminController.getSingleAdmin);

// ---------------->> Delete Admin route <<----------------------
router.delete('/:id', authValidator('admin'), AdminController.deleteAdmin);

// ---------------->> Update Admin route <<----------------------
router.patch(
  '/:id',
  authValidator('admin'),
  validateRequest(updateAdminValidationSchema),
  AdminController.updateAdmin,
);

export const AdminRoutes = router;
