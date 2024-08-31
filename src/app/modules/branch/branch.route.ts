import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BranchController } from './branch.controller';
import { BranchValidation } from './branch.validation';

const router = Router();

// GET
router.get('/', BranchController.getAll);
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  BranchController.getById,
);

// POST
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BranchValidation.create),
  BranchController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BranchValidation.create.partial()),
  BranchController.update,
);

// DELETE
router.delete(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(BranchValidation.remove),
  BranchController.remove,
);

export const BranchRouter = router;
