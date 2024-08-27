import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BrandService } from './brand.service';

const create = catchAsync(async (req, res) => {
  const result = await BrandService.create(req?.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Brand created successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await BrandService.update(
    req?.user?._id,
    req.params?.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand updated successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await BrandService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'brands fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await BrandService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand fetched successfully',
    data: result,
  });
});

const toggleFeatured = catchAsync(async (req, res) => {
  const result = await BrandService.toggleFeatured(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Featured updated successfully',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await BrandService.remove(req.body?.ids);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand removed successfully',
    data: result,
  });
});

export const BrandController = {
  create,
  update,
  getAll,
  getById,
  toggleFeatured,
  remove,
};
