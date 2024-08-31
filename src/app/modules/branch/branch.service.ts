import calculatePagination from '../../utils/calculatePagination';
import { branchSearchableFields } from './branch.constant';
import Branch from './branch.model';
import { TBranch } from './branch.type';

const create = async (userId: string, payload: TBranch) => {
  await Branch.create({ ...payload, updatedBy: userId });

  return null;
};

const update = async (userId: string, branchId: string, payload: TBranch) => {
  await Branch.findByIdAndUpdate(branchId, { ...payload, updatedBy: userId });

  return null;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: branchSearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const branchs = await Branch.find(searchConditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Branch.countDocuments(searchConditions);

  return {
    data: branchs,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const branch = await Branch.findById(id).populate(['updatedBy']);

  return branch;
};

const remove = async (ids: string[]) => {
  await Branch.deleteMany({ _id: { $in: ids } });

  return null;
};

export const BranchService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
