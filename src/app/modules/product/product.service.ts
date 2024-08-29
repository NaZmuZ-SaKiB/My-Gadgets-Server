import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.type';
import calculatePagination from '../../utils/calculatePagination';
import { productSearchableFields } from './product.constant';
import { generateProductQuery } from './product.utils';

const create = async (userId: string, payload: TProduct) => {
  await Product.create({ ...payload, updatedBy: userId });

  return null;
};

const update = async (
  userId: string,
  productId: string,
  payload: Partial<TProduct>,
) => {
  const isProduct = await Product.findById(productId).select('_id');

  if (!isProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }

  await Product.findByIdAndUpdate(
    productId,
    { ...payload, updatedBy: userId },
    {
      new: true,
    },
  );
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const query = await generateProductQuery(filters);

  const products = await Product.find({ ...query, ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate(['images']);

  const total = await Product.countDocuments({ ...query, ...searchConditions });

  return {
    data: products,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const product = await Product.findById(id).populate([
    'categories',
    'brand',
    'images',
    'updatedBy',
  ]);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }

  return product;
};

const remove = async (ids: string[]) => {
  await Product.deleteMany({ _id: { $in: ids } });
};

export const ProductService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
