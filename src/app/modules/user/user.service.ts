import { FilterQuery } from 'mongoose';
import calculatePagination from '../../utils/calculatePagination';
import { USER_ROLE, userRoles, userSearchableFields } from './user.constant';
import User from './user.model';
import { TUser, TUserRole } from './user.type';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

export const UserService = {
  createAdmin,
  getById,
  getAll,
  update,
  userRoleToggle,
};
