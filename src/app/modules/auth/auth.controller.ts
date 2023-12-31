import httpStatus from 'http-status';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// -------------------->> Login User Auth Controller <<-------------------
const loginUser = catchAsync(async (req, res) => {
  const { refreshToken, ...result } = await AuthServices.loginUserIntoDB(
    req.body,
  );

  res.cookie('ph-refresh-token', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});

// -------------------->> Change Password Auth Controller <<-------------------
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordIntoDB(req.user, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Change password successfully',
    data: result,
  });
});

// -------------------->> Refresh Token Auth Controller <<-------------------
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies['ph-refresh-token'];
  const result = await AuthServices.refreshToken(token);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully',
    data: result,
  });
});

// -------------------->> Forget Password Auth Controller <<-------------------
const forgetPassword = catchAsync(async (req, res) => {
  const id = req.body.id;
  const result = await AuthServices.forgetPassword(id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'We have send you a password reset mail, Please check you email',
    data: result,
  });
});

// -------------------->> Reset Password Auth Controller <<-------------------
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

// -------------------->> Export Auth Controllers <<-------------------
export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
