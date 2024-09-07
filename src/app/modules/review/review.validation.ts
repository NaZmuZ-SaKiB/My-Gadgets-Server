import { z } from 'zod';
import { reviewStatuses } from './review.constant';

const create = z.object({
  product: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(500),
  status: z.enum([...(reviewStatuses as [string, ...string[]])]),
});

const remove = z.object({
  ids: z.array(z.string()).min(1, 'At least one id is required'),
});

export const ReviewValidation = {
  create,
  remove,
};
