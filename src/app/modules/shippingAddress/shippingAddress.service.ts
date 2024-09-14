import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import ShippingAddress from './shippingAddress.model';
import { TShippingAddress } from './shippingAddress.type';
import { startSession } from 'mongoose';

const create = async (userId: string, payload: TShippingAddress) => {
  const shippingAddresses = await ShippingAddress.find({ user: userId });

  if (shippingAddresses.length > 3) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not add more than 4 shipping addresses.',
    );
  }

  if (shippingAddresses.length === 0) {
    payload.default = true;
  }

  await ShippingAddress.create({ ...payload, user: userId });

  return null;
};

const update = async (
  userId: string,
  shippingAddressId: string,
  payload: Partial<TShippingAddress>,
) => {
  const isExist = await ShippingAddress.exists({
    _id: shippingAddressId,
    user: userId,
  }).select('_id');

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shipping address not found.');
  }

  const session = await startSession();

  try {
    session.startTransaction();

    if (payload.default) {
      await ShippingAddress.updateMany(
        { user: userId },
        { default: false },
        { runValidators: true, session },
      );
    }

    await ShippingAddress.findByIdAndUpdate(shippingAddressId, payload, {
      runValidators: true,
      session,
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }

  return null;
};

const getAll = async (userId: string) => {
  const shippingAddresses = await ShippingAddress.find({ user: userId });

  return shippingAddresses;
};

const getById = async (shippingAddressId: string) => {
  const shippingAddress = await ShippingAddress.findById(shippingAddressId);

  if (!shippingAddress) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shipping address not found.');
  }

  return shippingAddress;
};

const remove = async (userId: string, shippingAddressId: string) => {
  const isExist = await ShippingAddress.exists({
    _id: shippingAddressId,
    user: userId,
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shipping address not found.');
  }

  await ShippingAddress.findByIdAndDelete(shippingAddressId);

  return null;
};

export const ShippingAddressService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
