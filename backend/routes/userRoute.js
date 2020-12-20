import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserDetailsByID,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post('/login', authUser);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserDetailsByID)
  .put(protect, admin, updateUser);

export default router;
