import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';

const router = Router();

// GET
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoryController.create,
);

export const CategoryRouter = router;
