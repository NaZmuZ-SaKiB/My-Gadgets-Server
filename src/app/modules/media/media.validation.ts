import { z } from 'zod';

export const create = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  publicId: z.string({
    required_error: 'Public ID is required',
    invalid_type_error: 'Public ID must be a string',
  }),
  height: z.number({
    required_error: 'Height is required',
    invalid_type_error: 'Height must be a number',
  }),
  width: z.number({
    required_error: 'Width is required',
    invalid_type_error: 'Width must be a number',
  }),
  format: z.string({
    required_error: 'Format is required',
    invalid_type_error: 'Format must be a string',
  }),
  url: z
    .string({
      required_error: 'URL is required',
      invalid_type_error: 'URL must be a string',
    })
    .url({
      message: 'Invalid URL',
    }),

  secureUrl: z
    .string({
      required_error: 'Secure URL is required',
      invalid_type_error: 'Secure URL must be a string',
    })
    .url({
      message: 'Invalid URL',
    }),
  thumbnailUrl: z
    .string({
      required_error: 'Thumbnail URL is required',
      invalid_type_error: 'Thumbnail URL must be a string',
    })
    .url({
      message: 'Invalid URL',
    }),
});

const remove = z.object({
  ids: z.array(z.string()).min(1, 'At least one id is required'),
});

export const MediaValidation = { create, remove };
