import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send(req.body);
  } else {
    res.status(401).send('Invalid password or username');
  }
});
