import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Order from './order.model';
import { TOrder } from './order.type';
import { ORDER_STATUS } from './order.constant';
import calculatePagination from '../../utils/calculatePagination';
import { FilterQuery, startSession } from 'mongoose';
import { Product } from '../product/product.model';

const create = async (userId: string, payload: TOrder) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const order = await Order.create(
      [
        {
          ...payload,
          user: userId,
        },
      ],
      { session },
    );

    for (const item of payload.orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } },
        { session },
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return order[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const update = async (orderId: string, payload: Partial<TOrder>) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found.');
  }

  if (payload.isPaid && !order.isPaid) {
    payload.paidAt = new Date();
  }

  if (
    payload.status === ORDER_STATUS.COMPLETED &&
    order.status !== ORDER_STATUS.COMPLETED
  ) {
    payload.completedAt = new Date();
  }

  const session = await startSession();

  try {
    session.startTransaction();

    await Order.findByIdAndUpdate(orderId, payload, {
      runValidators: true,
      session,
    });

    if (payload.status === ORDER_STATUS.CANCELLED) {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { quantity: item.quantity } },
          { session },
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }

  return null;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  const conditions: FilterQuery<TOrder> = {};

  if (filters?.status) {
    conditions.status = filters?.status;
  }

  if (filters?.cancelRequested) {
    conditions.cancelRequested = true;
  }

  if (filters?.isPaid) {
    conditions.isPaid = true;
  }

  if (filters?.user) {
    conditions.user = filters?.user;
  }

  const orders = await Order.find(conditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate(['user', 'shippingAddress']);

  const total = await Order.countDocuments(conditions);

  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (orderId: string) => {
  const order = await Order.findById(orderId).populate([
    'user',
    'shippingAddress',
  ]);

  return order;
};

export const OrderServices = {
  create,
  update,
  getAll,
  getById,
};
