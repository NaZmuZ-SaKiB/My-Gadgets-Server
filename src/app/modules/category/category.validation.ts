import { z } from 'zod';

export const create = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  label: z.string({
    required_error: 'Label is required',
    invalid_type_error: 'Label must be a string',
  }),
});

export const CategoryValidation = {
  create,
};
