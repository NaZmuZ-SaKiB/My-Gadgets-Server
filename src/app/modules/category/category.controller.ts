import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryService } from './category.service';

const create = catchAsync(async (req, res) => {
  const result = await CategoryService.create(req?.user?._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await CategoryService.update(
    req?.user?._id,
    req.params?.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await CategoryService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await CategoryService.getById(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category fetched successfully',
    data: result,
  });
});

const toggleFeatured = catchAsync(async (req, res) => {
  const result = await CategoryService.toggleFeatured(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Featured updated successfully',
    data: result,
  });
});

const toggleShowOnTopMenu = catchAsync(async (req, res) => {
  const result = await CategoryService.toggleShowOnTopMenu(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Show on top menu updated successfully',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await CategoryService.remove(req.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Category removed successfully',
    data: result,
  });
});

export const CategoryController = {
  create,
  update,
  getAll,
  getById,
  toggleFeatured,
  toggleShowOnTopMenu,
  remove,
};
