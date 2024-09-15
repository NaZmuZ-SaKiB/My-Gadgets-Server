import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ShippingAddressController } from './shippingAddress.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ShippingAddressValidation } from './shippingAddress.validation';

const router = Router();

// GET
router.get('/', auth(), ShippingAddressController.getAll);
router.get('/:id', auth(), ShippingAddressController.getById);

// POST
router.get(
  '/',
  auth(),
  validateRequest(ShippingAddressValidation.create),
  ShippingAddressController.create,
);

// PATCH
router.patch(
  '/:id',
  auth(),
  validateRequest(ShippingAddressValidation.create.partial()),
  ShippingAddressController.update,
);

// DELETE
router.delete('/:id', auth(), ShippingAddressController.remove);

export const ShippingAddressRouter = router;
