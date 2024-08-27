import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { MediaController } from './media.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MediaValidation } from './media.validation';

const router = Router();

// GET
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  MediaController.getAll,
);
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  MediaController.getById,
);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(MediaValidation.create),
  MediaController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(MediaValidation.create.partial()),
  MediaController.update,
);

// DELETE
router.delete(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(MediaValidation.remove),
  MediaController.remove,
);
