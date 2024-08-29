import { Router } from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';

const router = Router();

// GET
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(ProductValidation.create),
  ProductController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(ProductValidation.create.partial()),
  ProductController.update,
);

// DELETE
router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  ProductController.remove,
);

export const ProductRouter = router;
