import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShippingAddressService } from './shippingAddress.service';

const create = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.create(req.user?._id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Shipping address created successfully.',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.update(
    req.user?._id,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Shipping address updated successfully.',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.getAll(req.user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.getById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await ShippingAddressService.remove(
    req.user?._id,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Shipping address removed successfully.',
    data: result,
  });
});

export const ShippingAddressController = {
  create,
  update,
  getAll,
  getById,
  remove,
};
