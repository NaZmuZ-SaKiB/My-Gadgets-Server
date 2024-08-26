import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import User from '../modules/user/user.model';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.type';
import { jwtHelpers } from '../utils/jwtHelpers';
import { authKey } from '../constants/indes';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not logged in.');
    }

    let decoded;

    try {
      decoded = await jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as string,
      );
    } catch (err) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Invalid token. May be expired.',
      );
    }

    const isUser = await User.findById(decoded.payload?._id);

    if (!isUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (
      requiredRoles &&
      requiredRoles.length > 0 &&
      !requiredRoles.includes(decoded.payload?.role as TUserRole)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    req.user = decoded.payload;

    next();
  });
};

export default auth;
