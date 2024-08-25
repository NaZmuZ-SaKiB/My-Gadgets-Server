import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../utils/jwtHelpers';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser } from '../user/user.type';
import { USER_ROLE } from '../user/user.constant';
import User from '../user/user.model';

const signUp = async (payload: TUser) => {
  if (payload.role !== USER_ROLE.USER) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `You are not allowed to create this role: "${payload.role}."`,
    );
  }

  const user = await User.create(payload);

  const token = await jwtHelpers.generateToken(
    {
      _id: `${user._id}`,
      email: user.email,
      role: user.role,
    },
    `${config.jwt_access_secret}`,
    `${config.jwt_access_expires_in}`,
  );

  return { user, token };
};

const signIn = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid email or password.');
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid email or password.');
  }

  const token = await jwtHelpers.generateToken(
    {
      _id: `${user._id}`,
      email: user.email,
      role: user.role,
    },
    `${config.jwt_access_secret}`,
    `${config.jwt_access_expires_in}`,
  );

  user.password = '';

  return { user, token };
};

export const AuthService = {
  signUp,
  signIn,
};
