import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const currentUser = catchAsync(async (req, res) => {
  const result = await AuthService.currentUser(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Current user fetched successfully.',
    data: result,
  });
});

const signUp = catchAsync(async (req, res) => {
  const result = await AuthService.signUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Sign up successful.',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthService.signIn(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Log in successful.',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(req?.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully.',
    data: result,
  });
});

export const AuthController = {
  currentUser,
  signUp,
  signIn,
  changePassword,
};
