import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

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

// DELETE

export const AuthRouter = router;
