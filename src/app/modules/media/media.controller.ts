import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MediaService } from './media.service';

const create = catchAsync(async (req, res) => {
  const result = await MediaService.create(req?.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Media created successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await MediaService.update(
    req?.user?._id,
    req.params?.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Media updated successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await MediaService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'brands fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await MediaService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Media fetched successfully',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await MediaService.remove(req.body?.ids);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Media removed successfully',
    data: result,
  });
});

export const MediaController = {
  create,
  update,
  getAll,
  getById,
  remove,
};
