import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProductById,
  createNewProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createNewProduct);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

export default router;
