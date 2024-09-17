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
