import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import calculatePagination from '../../utils/calculatePagination';
import { brandSearchableFields } from './brand.constant';
import Brand from './brand.model';
import { TBrand } from './brand.type';
import { Product } from '../product/product.model';

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
    .populate(['image']);

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
  const brand = await Brand.findById(id).populate(['updatedBy', 'image']);

  return brand;
};

const remove = async (ids: string[]) => {
  const product = await Product.findOne({ brand: { $in: ids } })
    .select('_id brand')
    .populate('brand');

  if (product) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Brand ${(product.brand as unknown as TBrand).name} is associated with products. Please remove the products first.`,
    );
  }

  await Brand.deleteMany({ _id: { $in: ids } });

  return null;
};

export const BrandService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
