import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

// GET

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
