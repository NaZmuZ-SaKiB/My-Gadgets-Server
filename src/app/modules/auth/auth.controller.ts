import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req, res) => {
  const result = await AuthService.signUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User sign up successful.',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthService.signIn(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User sign in successful.',
    data: result,
  });
});

export const AuthController = {
  signUp,
  signIn,
};
