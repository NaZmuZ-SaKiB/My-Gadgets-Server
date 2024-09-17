import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const create = catchAsync(async (req, res) => {
  const result = await OrderServices.create(req?.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order Placed.',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await OrderServices.update(req?.params?.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Updated.',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await OrderServices.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully.',
    data: result.data,
    meta: result.meta,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await OrderServices.getById(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched.',
    data: result,
  });
});

export const OrderController = {
  create,
  update,
  getAll,
  getById,
};
