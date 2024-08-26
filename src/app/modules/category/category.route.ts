import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';

const router = Router();

// GET
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  CategoryController.getAll,
);
router.get('/:id', CategoryController.getById);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoryController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create.partial()),
  CategoryController.update,
);
router.patch(
  '/:id/featured',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  CategoryController.toggleFeatured,
);
router.patch(
  '/:id/show-on-top-menu',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  CategoryController.toggleShowOnTopMenu,
);

// DELETE
router.delete(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.remove),
  CategoryController.remove,
);

export const CategoryRouter = router;
