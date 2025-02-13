import { FilterQuery } from 'mongoose';
import calculatePagination from '../../utils/calculatePagination';
import { USER_ROLE, userRoles, userSearchableFields } from './user.constant';
import User from './user.model';
import { TUser, TUserRole } from './user.type';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import Order from '../order/order.model';
import { Product } from '../product/product.model';
import Review from '../review/review.model';
import { ORDER_STATUS } from '../order/order.constant';

const createAdmin = async (payload: TUser) => {
  await User.create({ ...payload, role: USER_ROLE.ADMIN });

  return null;
};

const getById = async (userId: string) => {
  const user = await User.findById(userId);

  return user;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: userSearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const query: FilterQuery<TUser> = searchConditions;

  if (filters?.role && userRoles.includes(filters.role)) {
    query.role = filters.role;
  }

  const finalQuery: FilterQuery<TUser> = {
    $and: [query, { role: { $ne: USER_ROLE.SUPER_ADMIN } }],
  };

  const users = await User.find(finalQuery)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  return {
    data: users,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const update = async (
  userId: string,
  payload: { name?: string; email?: string },
) => {
  await User.findByIdAndUpdate(userId, payload);

  return null;
};

const userRoleToggle = async (
  authUserId: string,
  payload: { id: string; role: TUserRole },
) => {
  if (authUserId === payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You cannot change your own role');
  }

  await User.findByIdAndUpdate(payload.id, { role: payload.role });

  return null;
};

const dashboard = async () => {
  const totalUsers = await User.countDocuments({
    role: { $ne: USER_ROLE.SUPER_ADMIN },
  });

  const totalOrders = await Order.countDocuments({
    status: { $ne: ORDER_STATUS.CANCELLED },
  });

  const pendingOrders = await Order.countDocuments({
    status: ORDER_STATUS.PENDING,
  });

  const processingOrders = await Order.countDocuments({
    status: ORDER_STATUS.PROCESSING,
  });

  const shippedOrders = await Order.countDocuments({
    status: ORDER_STATUS.SHIPPED,
  });

  const date30DaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  const completedOrders = await Order.find({
    status: ORDER_STATUS.COMPLETED,
    // createdAt: { $gte: date30DaysAgo },
  });

  const totalSale = completedOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0,
  );

  const canceledOrders = await Order.countDocuments({
    status: ORDER_STATUS.CANCELLED,
  });

  const totalProducts = await Product.countDocuments();

  const totalReviews = await Review.countDocuments();

  return {
    totalUsers,
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    completedOrders: completedOrders.length,
    canceledOrders,
    totalSale,
    totalProducts,
    totalReviews,
  };
};

export const UserService = {
  createAdmin,
  getById,
  getAll,
  update,
  userRoleToggle,
  dashboard,
};
