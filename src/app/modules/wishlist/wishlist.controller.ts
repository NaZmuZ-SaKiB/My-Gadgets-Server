import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WishlistService } from './wishlist.service';

const add = catchAsync(async (req, res) => {
  const result = await WishlistService.add(req.user?._id, req.params.productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to wishlist',
    data: result,
  });
});

const remove = catchAsync(async (req, res) => {
  const result = await WishlistService.remove(
    req.user?._id,
    req.params.productId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from wishlist',
    data: result,
  });
});

const get = catchAsync(async (req, res) => {
  const result = await WishlistService.get(req.user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist fetched',
    data: result,
  });
});

const clear = catchAsync(async (req, res) => {
  const result = await WishlistService.clear(req.user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist cleared',
    data: result,
  });
});

export const WishlistController = {
  add,
  remove,
  get,
  clear,
};
