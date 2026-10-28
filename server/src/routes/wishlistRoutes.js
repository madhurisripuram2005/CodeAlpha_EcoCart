import { Router } from 'express';
import { wishlistController } from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// All wishlist endpoints require authentication
router.use(authenticate);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
