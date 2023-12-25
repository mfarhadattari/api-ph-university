import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const authValidator = (...accessRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized user',
      );
    }

    // check token verified
    const decoded = jwt.verify(
      accessToken,
      config.jwt_access_secret as string,
      config.jwt_access_config as Record<string, unknown>,
    ) as JwtPayload;

    const { id, role, iat } = decoded;

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
    // checking password update time > token issued time
    if (
      isUserExist.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        isUserExist.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (!accessRole || !accessRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized user',
      );
    }
    req.user = decoded;

    next();
  });
};

export default authValidator;
