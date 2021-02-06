import express from 'express';
import {
  getProducts,
  getTopRatedProducts,
  getProductById,
  deleteProductById,
  createNewProduct,
  updateProduct,
  addProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createNewProduct);

router.get('/top', getTopRatedProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, addProductReview);

export default router;
