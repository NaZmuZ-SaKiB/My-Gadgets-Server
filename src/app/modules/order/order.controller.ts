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
