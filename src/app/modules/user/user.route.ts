import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import { USER_ROLE } from './user.constant';
import { AuthValidation } from '../auth/auth.validation';

const router = Router();

// GET
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.TEST_ADMIN),
  UserController.getAll,
);
router.get(
  '/dashboard',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.TEST_ADMIN),
  UserController.dashboard,
);
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.TEST_ADMIN),
  UserController.getById,
);

// POST
router.post(
  '/create-admin',
  auth(USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.signUp),
  UserController.createAdmin,
);

// PATCH
router.patch(
  '/',
  auth(),
  validateRequest(UserValidation.update),
  UserController.update,
);

router.patch(
  '/role-toggle',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(UserValidation.userRoleToggle),
  UserController.userRoleToggle,
);

export const UserRouter = router;
