import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BrandController } from './brand.controller';
import { BrandValidation } from './brand.validation';

const router = Router();

// GET
router.get('/', BrandController.getAll);
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  BrandController.getById,
);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BrandValidation.create),
  BrandController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BrandValidation.create.partial()),
  BrandController.update,
);
router.patch(
  '/:id/featured',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  BrandController.toggleFeatured,
);

// DELETE
router.delete(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BrandValidation.remove),
  BrandController.remove,
);

export const BrandRouter = router;
