import { z } from 'zod';

const create = z.object({
  addressLine1: z.string({
    required_error: 'Address is required.',
  }),
  addressLine2: z.string().optional(),
  city: z.string({ required_error: 'City is required.' }),
  district: z.string({ required_error: 'District is required.' }),
  division: z.string({ required_error: 'Division is required.' }),
  zipCode: z.string({
    required_error: 'Zip Code is required.',
  }),
  phone: z.string({
    required_error: 'Phone is required.',
  }),
  default: z.boolean().optional(),
});

export const ShippingAddressValidation = {
  create,
};
