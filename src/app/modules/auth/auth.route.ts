import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import {
  changePasswordValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';

// -------->> Initialized Router <<------------ //
const router = express.Router();

// ------------->> Login User Auth Route <<--------------- //
router.post(
  '/login-user',
  validateRequest(loginUserValidationSchema),
  AuthControllers.loginUser,
);

// ------------->> Change Password Auth Route <<--------------- //
router.post(
  '/change-password',
  authValidator('admin', 'faculty', 'student'),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// ------------->> Refresh Token Auth Route <<--------------- //
router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

// ---------->> Export Auth Routes <------------- //
export const AuthRoutes = router;
