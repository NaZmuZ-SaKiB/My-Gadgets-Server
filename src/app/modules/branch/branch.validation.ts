import { z } from 'zod';

const create = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),
  phone: z.string({
    required_error: 'Phone is required',
    invalid_type_error: 'Phone must be a string',
  }),
  mapLink: z
    .string({
      invalid_type_error: 'Map link must be a string',
    })
    .optional(),
});

const remove = z.object({
  ids: z.array(z.string()).min(1, 'At least one id is required'),
});

export const BranchValidation = {
  create,
  remove,
};
