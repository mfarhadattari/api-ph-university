import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

// initialize router
const router = express.Router();

// ---------------->> Get all Admins route <<----------------------
router.get('/', AdminController.getAllAdmins);

// ---------------->> Get Single Admin route <<----------------------
router.get('/:id', AdminController.getSingleAdmin);

// ---------------->> Delete Admin route <<----------------------
router.delete('/:id', AdminController.deleteAdmin);

// ---------------->> Update Admin route <<----------------------
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminController.updateAdmin,
);

export const AdminRoutes = router;
