import calculatePagination from '../../utils/calculatePagination';
import { categorySearchableFields } from './category.constant';
import Category from './category.model';
import { TCategory } from './category.type';

const create = async (userId: string, payload: TCategory) => {
  const category = await Category.create({ ...payload, updatedBy: userId });

  return category;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: categorySearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const categories = await Category.find(searchConditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(searchConditions);

  return {
    data: categories,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const category = await Category.findById(id).populate('updatedBy');

  return category;
};

export const CategoryService = {
  create,
  getAll,
  getById,
};
