import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import calculatePagination from '../../utils/calculatePagination';
import { categorySearchableFields } from './category.constant';
import Category from './category.model';
import { TCategory } from './category.type';
import { FilterQuery, startSession, Types } from 'mongoose';

const create = async (userId: string, payload: TCategory) => {
  let parentCatrgory = null;

  // check if parent category exists
  if (payload.parent) {
    parentCatrgory = await Category.findById(payload.parent);

    if (!parentCatrgory) {
      throw new AppError(httpStatus.NOT_FOUND, 'Parent category not found.');
    }
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const category = await Category.create(
      [{ ...payload, updatedBy: userId }],
      { session },
    );

    // update parent category
    if (parentCatrgory) {
      parentCatrgory.subCategories.push(category[0]._id);
      await parentCatrgory.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || "Couldn't create category.",
    );
  }

  return null;
};

const update = async (
  userId: string,
  categoryId: string,
  payload: TCategory,
) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found.');
  }

  let parentCatrgory = null;

  // check if parent category changed and exists
  if (
    payload.parent &&
    category?.parent?.toString() !== payload.parent?.toString()
  ) {
    parentCatrgory = await Category.findById(payload.parent);

    if (!parentCatrgory) {
      throw new AppError(httpStatus.NOT_FOUND, 'Parent category not found.');
    }
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        ...payload,
        updatedBy: userId,
      },
      { new: true, runValidators: true, session },
    );

    if (!updateCategory) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category update failed.');
    }

    if (parentCatrgory) {
      // remove category from old parent
      const oldParent = await Category.findById(category.parent);
      if (oldParent) {
        oldParent.subCategories = oldParent.subCategories.filter(
          (id) => id.toString() !== categoryId,
        );
        await oldParent.save({ session });
      }

      // add category to new parent
      parentCatrgory.subCategories.push(updateCategory._id);
      await parentCatrgory.save({ session });
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || "Couldn't update category.",
    );
  }

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

  const query: FilterQuery<TCategory> = searchConditions;

  if (filters?.onlyParent === 'true') {
    query.parent = { $in: [null, undefined] };
  }

  if (filters?.featured === 'true') query.featured = true;
  if (filters?.showOnTopMenu === 'true') query.showOnTopMenu = true;

  const categories = await Category.find(query)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate(['parent', 'image']);

  const total = await Category.countDocuments(query);

  return {
    data: categories,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getAllWithSubCats = async () => {
  const categories = await Category.find({
    parent: { $in: [null, undefined] },
  }).populate(['subCategories']);

  return categories;
};

const getById = async (id: string) => {
  const category = await Category.findById(id).populate([
    'updatedBy',
    'parent',
    'image',
  ]);

  return category;
};

const toggleFeatured = async (id: string) => {
  const featuredCount = await Category.countDocuments({ featured: true });

  if (featuredCount >= 12) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Only 12 categories can be featured at a time.',
    );
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found.');
  }

  category.featured = !category.featured;
  await category.save();

  return null;
};

const toggleShowOnTopMenu = async (id: string) => {
  const showOnTopMenuCount = await Category.countDocuments({
    showOnTopMenu: true,
  });

  if (showOnTopMenuCount >= 8) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Only 8 categories can be shown on top menu at a time.',
    );
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found.');
  }

  category.showOnTopMenu = !category.showOnTopMenu;
  await category.save();

  return null;
};

const remove = async (ids: string[]) => {
  const categories = await Category.find({ _id: { $in: ids } });

  const parentCategoryIds = categories
    .filter((cat) => cat.parent)
    .map((cat) => cat.parent);

  const subCategoryIds: Types.ObjectId[] = [];

  categories.forEach((cat) => {
    subCategoryIds.push(...cat.subCategories);
  });

  const session = await startSession();

  try {
    session.startTransaction();

    // remove categories from parent
    await Category.updateMany(
      { _id: { $in: parentCategoryIds } },
      { $pull: { subCategories: { $in: ids } } },
      { session },
    );

    // remove categories
    await Category.deleteMany(
      { _id: { $in: [...ids, ...subCategoryIds] } },
      { session },
    );

    // TODO: remove products

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || "Couldn't delete categories.",
    );
  }

  return null;
};

export const CategoryService = {
  create,
  update,
  getAll,
  getAllWithSubCats,
  getById,
  toggleFeatured,
  toggleShowOnTopMenu,
  remove,
};
