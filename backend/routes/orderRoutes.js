import express from 'express';
import {
  addOrderItems,
  getOrderByID,
  updateOrderStatusToPaid,
  getLoggedInUserOrders,
  getAllOrders,
  updateDeliverStatusToDelivered,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getLoggedInUserOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderStatusToPaid);
router.route('/:id/deliver').put(protect, updateDeliverStatusToDelivered);

export default router;
