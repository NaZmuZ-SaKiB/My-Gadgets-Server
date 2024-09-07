import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const create = catchAsync(async (req, res) => {
  const result = await ReviewService.create(req.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Your review is posted & pending for approval.',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ReviewService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully.',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ReviewService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully.',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await ReviewService.getById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully.',
    data: result,
  });
});

const getAllByProductId = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllByProductId(req.params.productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully.',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await ReviewService.remove(req.body.ids);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Review deleted successfully.',
    data: result,
  });
});

export const ReviewController = {
  create,
  update,
  getAll,
  getById,
  getAllByProductId,
  remove,
};
