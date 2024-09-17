import { Router } from 'express';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = Router();

// GET
router.get('/', auth(), OrderController.getAll);
router.get('/:id', auth(), OrderController.getById);

// POST
router.post(
  '/',
  auth(),
  validateRequest(OrderValidation.create),
  OrderController.create,
);

// PATCH
router.post(
  '/:id',
  auth(),
  validateRequest(OrderValidation.update),
  OrderController.update,
);

export const OrderRouter = router;
