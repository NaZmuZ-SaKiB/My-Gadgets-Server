import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BranchService } from './branch.service';

const create = catchAsync(async (req, res) => {
  const result = await BranchService.create(req?.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Branch created successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await BranchService.update(
    req?.user?._id,
    req.params?.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Branch updated successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await BranchService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'branchs fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await BranchService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Branch fetched successfully',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await BranchService.remove(req.body?.ids);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Branch removed successfully',
    data: result,
  });
});

export const BranchController = {
  create,
  update,
  getAll,
  getById,
  remove,
};
