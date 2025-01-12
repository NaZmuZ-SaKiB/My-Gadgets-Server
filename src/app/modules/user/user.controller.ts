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

const getById = catchAsync(async (req, res) => {
  const result = await UserService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
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

const dashboard = catchAsync(async (req, res) => {
  const result = await UserService.dashboard();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard data fetched',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  getById,
  getAll,
  update,
  userRoleToggle,
  dashboard,
};
