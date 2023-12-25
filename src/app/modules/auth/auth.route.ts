import express from 'express';
import authValidator from '../../middlewares/authValidator';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import {
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
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

// ------------->> Forget Password Auth Route <<--------------- //
router.post(
  '/forget-password',
  validateRequest(forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

// ------------->> Reset Password Auth Route <<--------------- //
router.post(
  '/reset-password',
  validateRequest(resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

// ---------->> Export Auth Routes <------------- //
export const AuthRoutes = router;
