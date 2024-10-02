import { z } from 'zod';

const update = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const UserValidation = {
  update,
};
