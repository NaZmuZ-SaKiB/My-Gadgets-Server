import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import calculatePagination from '../../utils/calculatePagination';
import { brandSearchableFields } from './brand.constant';
import Brand from './brand.model';
import { TBrand } from './brand.type';

const create = async (userId: string, payload: TBrand) => {
  await Brand.create({ ...payload, updatedBy: userId });

  return null;
};

const update = async (userId: string, brandId: string, payload: TBrand) => {
  await Brand.findByIdAndUpdate(brandId, { ...payload, updatedBy: userId });

  return null;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: brandSearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const brands = await Brand.find(searchConditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate('parent');

  const total = await Brand.countDocuments(searchConditions);

  return {
    data: brands,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const brand = await Brand.findById(id).populate(['updatedBy']);

  return brand;
};

const toggleFeatured = async (id: string) => {
  const featuredCount = await Brand.countDocuments({ featured: true });

  if (featuredCount >= 12) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Only 12 brands can be featured at a time.',
    );
  }

  const brand = await Brand.findById(id);

  if (!brand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found.');
  }

  brand.featured = !brand.featured;
  await brand.save();

  return null;
};

const remove = async (ids: string[]) => {
  await Brand.deleteMany({ _id: { $in: ids } });

  return null;
};

export const BrandService = {
  create,
  update,
  getAll,
  getById,
  toggleFeatured,
  remove,
};
