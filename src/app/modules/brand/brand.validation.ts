import { z } from 'zod';

export const create = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  image: z.string().optional(),
});

const remove = z.object({
  ids: z.array(z.string()).min(1, 'At least one id is required'),
});

export const BrandValidation = {
  create,
  remove,
};
