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

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  const reviews = await Review.find()
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit)
    .populate([
      {
        path: 'product',
        select: 'name _id',
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

export const ReviewService = {
  create,
  getAll,
};
