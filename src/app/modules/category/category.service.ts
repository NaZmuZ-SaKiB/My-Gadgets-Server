import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import calculatePagination from '../../utils/calculatePagination';
import { categorySearchableFields } from './category.constant';
import Category from './category.model';
import { TCategory } from './category.type';

const create = async (userId: string, payload: TCategory) => {
  const category = await Category.create({ ...payload, updatedBy: userId });

  return null;
};

const update = async (
  userId: string,
  categoryId: string,
  payload: TCategory,
) => {
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      ...payload,
      updatedBy: userId,
    },
    { new: true, runValidators: true },
  );

  return null;
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

const toggleFeatured = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  category.featured = !category.featured;
  await category.save();

  return null;
};

const toggleShowOnTopMenu = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  category.showOnTopMenu = !category.showOnTopMenu;
  await category.save();

  return null;
};

const remove = async (id: string) => {
  await Category.findByIdAndDelete(id);

  return null;
};

export const CategoryService = {
  create,
  update,
  getAll,
  getById,
  toggleFeatured,
  toggleShowOnTopMenu,
  remove,
};
