import express from 'express';
import {
  addOrderItems,
  getOrderByID,
  updateOrderStatusToPaid,
  getLoggedInUserOrders,
} from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getLoggedInUserOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderStatusToPaid);

export default router;
