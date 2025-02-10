import { TUserRole } from './user.type';

export const userRoles: TUserRole[] = [
  'super_admin',
  'admin',
  'user',
  'test_admin',
];

export const userSearchableFields = ['name', 'email'];

export const USER_ROLE = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
  TEST_ADMIN: 'test_admin',
} as const;
