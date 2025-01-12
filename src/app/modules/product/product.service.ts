import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './product.model';
import { TProduct } from './product.type';
import calculatePagination from '../../utils/calculatePagination';
import { productSearchableFields } from './product.constant';
import { generateProductQuery } from './product.utils';
import Settings from '../settings/settings.model';
import { Types } from 'mongoose';
import { THomepageSettings } from '../settings/settings.type';
import Order from '../order/order.model';

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

  // const searchConditions = {
  //   $or: productSearchableFields.map((field) => ({
  //     [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
  //   })),
  // };
  const searchConditions = {
    $or: productSearchableFields.map((field) => ({
      $or: [
        {
          $expr: {
            $regexMatch: {
              input: {
                $replaceAll: { input: `$${field}`, find: ' ', replacement: '' },
              },
              regex: filters?.searchTerm || '',
              options: 'i',
            },
          },
        },
        {
          [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
        },
      ],
    })),
  };

  const query = await generateProductQuery(filters);

  const products = await Product.find({ ...query, ...searchConditions })
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate(['images', 'categories', 'brand']);

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

const topSelling = async () => {
  const products = await Order.aggregate([
    {
      $unwind: '$orderItems',
    },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: { $sum: '$orderItems.quantity' },
      },
    },
    {
      $sort: { totalSold: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $lookup: {
        from: 'media',
        localField: 'productDetails.images',
        foreignField: '_id',
        as: 'productDetails.images',
      },
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'productDetails.brand',
        foreignField: '_id',
        as: 'productDetails.brand',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'productDetails.categories',
        foreignField: '_id',
        as: 'productDetails.categories',
      },
    },
    {
      $unwind: {
        path: '$productDetails.brand',
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        _id: '$_id',
        name: '$productDetails.name',
        model: '$productDetails.model',
        brand: '$productDetails.brand',
        categories: '$productDetails.categories',
        quantity: '$productDetails.quantity',
        salePrice: '$productDetails.salePrice',
        slug: '$productDetails.slug',
        images: '$productDetails.images',
        totalSold: 1,
      },
    },
  ]);

  return products;
};

const remove = async (ids: string[]) => {
  // Get homepage settings
  // (only the fields that contain product ids)
  const settings = await Settings.findOne().select([
    'homepage.popularProducts',
    'homepage.featuredProducts',
    'homepage.flashSale',
    'homepage.topSellingProducts',
    'homepage.trendingProducts',
  ]);

  if (!settings) {
    throw new AppError(httpStatus.NOT_FOUND, 'Settings not found.');
  }

  // Extract homepage settings
  const homepageSettings: Partial<THomepageSettings> = settings.homepage;

  // Fields that contain product ids[] (same type)
  const homepageSettingsFields: (keyof THomepageSettings)[] = [
    'popularProducts',
    'topSellingProducts',
    'trendingProducts',
  ];

  // Remove product ids from homepage settings
  ids.forEach((productId) => {
    // Remove product id from each field (same type)
    homepageSettingsFields.forEach((field) => {
      const index = (homepageSettings[field] as Types.ObjectId[])?.findIndex(
        (i) => i.equals(productId),
      );

      if (index !== -1) {
        (homepageSettings[field] as any).splice(index, 1);
      }
    });

    // Remove product id from flashSale and featuredProducts
    const flashSaleIndex =
      homepageSettings.flashSale?.findIndex((item) =>
        item.product.equals(productId),
      ) ?? -1;

    if (flashSaleIndex !== -1) {
      homepageSettings.flashSale?.splice(flashSaleIndex, 1);
    }

    homepageSettings.featuredProducts = homepageSettings.featuredProducts?.map(
      (featuredProduct) => {
        const productIndex = featuredProduct.products.findIndex((i) =>
          i.equals(productId),
        );

        if (productIndex !== -1) {
          featuredProduct.products.splice(productIndex, 1);
        }

        return featuredProduct;
      },
    );
  });

  const session = await Product.startSession();

  try {
    session.startTransaction();

    await Settings.findByIdAndUpdate(
      settings._id,
      { homepage: homepageSettings },
      { session },
    );

    await Product.deleteMany({ _id: { $in: ids } }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }

  return null;
};

export const ProductService = {
  create,
  update,
  getAll,
  getById,
  topSelling,
  remove,
};
