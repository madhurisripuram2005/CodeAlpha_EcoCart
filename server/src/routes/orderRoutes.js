import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// All order endpoints require authentication
router.use(authenticate);

router.post('/checkout', orderController.checkout);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

export default router;
