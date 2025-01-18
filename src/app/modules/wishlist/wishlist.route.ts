import { Router } from 'express';
import auth from '../../middlewares/auth';
import { WishlistController } from './wishlist.controller';

const router = Router();

// Get
router.get('/', auth(), WishlistController.get);

// PUT
router.put('/:productId', auth(), WishlistController.add);

// PATCH
router.patch('/:productId', auth(), WishlistController.remove);

// DELETE
router.delete('/', auth(), WishlistController.clear);

export const WishlistRouter = router;
