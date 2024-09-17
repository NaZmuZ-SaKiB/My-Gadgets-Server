import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Order from './order.model';
import { TOrder } from './order.type';
import { ORDER_STATUS } from './order.constant';
import calculatePagination from '../../utils/calculatePagination';
import { FilterQuery } from 'mongoose';

const create = async (userId: string, payload: TOrder) => {
  await Order.create({
    ...payload,
    user: userId,
  });

  return null;
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

  await Order.findByIdAndUpdate(orderId, payload, { runValidators: true });

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

  const orders = await Order.find(conditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

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
