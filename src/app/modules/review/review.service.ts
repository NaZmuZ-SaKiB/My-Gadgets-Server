import calculatePagination from '../../utils/calculatePagination';
import Review from './review.model';
import { TReview } from './review.type';

const create = async (userId: string, payload: TReview) => {
  await Review.create({
    ...payload,
    user: userId,
  });

  return null;
};

const update = async (id: string, payload: Partial<TReview>) => {
  await Review.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return null;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  const reviews = await Review.find()
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate([
      {
        path: 'product',
        select: 'name slug _id',
      },
      {
        path: 'user',
      },
    ]);

  const total = await Review.countDocuments();

  return {
    data: reviews,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const review = await Review.findById(id).populate([
    {
      path: 'product',
      select: 'name _id slug',
    },
    {
      path: 'user',
    },
  ]);

  return review;
};

const remove = async (ids: string[]) => {
  await Review.deleteMany({ _id: { $in: ids } });

  return null;
};

export const ReviewService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
