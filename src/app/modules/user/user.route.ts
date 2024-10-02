import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

// GET

// POST

// PATCH
router.patch(
  '/',
  auth(),
  validateRequest(UserValidation.update),
  UserController.update,
);

export const UserRouter = router;
