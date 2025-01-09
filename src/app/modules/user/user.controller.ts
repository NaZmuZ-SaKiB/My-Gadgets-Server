import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New Admin created',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await UserService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await UserService.update(req?.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated',
    data: result,
  });
});

const userRoleToggle = catchAsync(async (req, res) => {
  const result = await UserService.userRoleToggle(req?.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  getAll,
  update,
  userRoleToggle,
};
