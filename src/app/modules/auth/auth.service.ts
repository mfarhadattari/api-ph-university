import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { IChangePassword, ILoginUser, IResetPassword } from './auth.interface';
import { createJWTToken, sendResetPasswordMail } from './auth.utils';

// -------------------->> Login User Auth Service <<-------------------
const loginUserIntoDB = async (payload: ILoginUser) => {
  // checking user exist or not
  const isUserExist = await User.isUserExistByCustomId(payload.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking user delete or not
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking user blocked or unblocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // matching password
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  // create token and send to client
  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = createJWTToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_config,
  );

  const refreshToken = createJWTToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_config,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExist.needPasswordChange,
  };
};

// -------------------->> Change Password Auth Service <<-------------------
const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: IChangePassword,
) => {
  // checking user exist or not
  const isUserExist = await User.isUserExistByCustomId(user.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking user delete or not
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking user blocked or unblocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // matching password
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  // hashing new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: user.id, role: user.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

// -------------------->> Refresh token Auth Service <<-------------------
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_config as Record<string, unknown>,
  ) as JwtPayload;

  const { id, iat } = decoded;

  // checking if the user is exist
  const isUserExist = await User.isUserExistByCustomId(id);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = isUserExist?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = isUserExist?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    isUserExist.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      isUserExist.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = createJWTToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_config,
  );

  return {
    accessToken,
  };
};

// -------------------->> Forget Password Auth Service <<-------------------
const forgetPassword = async (id: string) => {
  // checking user exist or not
  const isUserExist = await User.isUserExistByCustomId(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking user delete or not
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking user blocked or unblocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  const resetToken = createJWTToken(
    jwtPayload,
    config.jwt_access_secret as string,
    { ...config.jwt_access_config, expiresIn: '5m' },
  );

  const resetLink = `${
    config.client_base_url as string
  }/reset-password?id=${id}&token=${resetToken}`;

  sendResetPasswordMail(isUserExist.email, resetLink);

  return null;
};

// -------------------->> Reset Password Auth Service <<-------------------
const resetPassword = async (payload: IResetPassword, token: string) => {
  // checking user exist or not
  const isUserExist = await User.isUserExistByCustomId(payload?.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking user delete or not
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking user blocked or unblocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // decoding token
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
    config.jwt_access_config as Record<string, unknown>,
  ) as JwtPayload;

  if (decoded.id !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are unauthorized');
  }

  // hashing new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { id: decoded.id, role: decoded.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

// -------------------->> Export Auth Services <<-------------------
export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
  forgetPassword,
  resetPassword,
};
