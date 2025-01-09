import { z } from 'zod';

const update = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

const userRoleToggle = z.object({
  id: z.string(),
  role: z.string(),
});

export const UserValidation = {
  update,
  userRoleToggle,
};
