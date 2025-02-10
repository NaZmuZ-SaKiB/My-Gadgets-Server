import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

// GET
router.get('/me', auth(), AuthController.currentUser);

// POST
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signIn),
  AuthController.signIn,
);
router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUp),
  AuthController.signUp,
);

// PATCH
router.patch(
  '/change-password',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.changePassword),
  AuthController.changePassword,
);

// DELETE

export const AuthRouter = router;
