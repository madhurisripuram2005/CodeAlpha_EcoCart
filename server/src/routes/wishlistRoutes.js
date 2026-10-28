import { Router } from 'express';
import { wishlistController } from '../controllers/wishlistController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// All wishlist endpoints require authentication
router.use(requireAuth);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
