import { FilterQuery } from 'mongoose';
import calculatePagination from '../../utils/calculatePagination';
import { USER_ROLE, userRoles, userSearchableFields } from './user.constant';
import User from './user.model';
import { TUser } from './user.type';

const createAdmin = async (payload: TUser) => {
  await User.create({ ...payload, role: USER_ROLE.ADMIN });

  return null;
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

export const UserService = {
  createAdmin,
  getAll,
  update,
};
