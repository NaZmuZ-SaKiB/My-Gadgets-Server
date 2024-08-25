import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const signUp = catchAsync(async (req, res) => {
  const result = await UserService.signUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User sign up successful.',
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await UserService.signIn(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User sign in successful.',
    data: result,
  });
});

export const UserController = {
  signUp,
  signIn,
};
