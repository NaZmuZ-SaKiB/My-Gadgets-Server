import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const create = catchAsync(async (req, res) => {
  const result = await ProductService.create(req?.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ProductService.update(
    req?.user?._id,
    req.params?.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ProductService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await ProductService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await ProductService.remove(req.body?.ids);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product removed successfully',
    data: result,
  });
});

export const ProductController = {
  create,
  update,
  getAll,
  getById,
  remove,
};
