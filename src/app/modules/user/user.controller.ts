import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const update = catchAsync(async (req, res) => {
  const result = await UserService.update(req?.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated',
    data: result,
  });
});

export const UserController = {
  update,
};
