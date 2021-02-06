import asyncHandler from 'express-async-handler';
import Product from '../models/productSchema.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const pageSize = 4;
  const page = Number(req.query.pageNumber);

  const productCount = await Product.countDocuments(keyword);
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(productCount / pageSize),
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'product successfully deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
});

// @desc    Create a new product
// @route   POST /api/products/
// @access  Private/Admin
const createNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  await product.save();

  res.status(201);
  res.json(product);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    brand,
    image,
    category,
    description,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Add a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const productAlreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (productAlreadyReviewed) {
      res.status(400);
      throw new Error('The product is already reviewed');
    } else {
      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(newReview);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce(
          (ratingAccumulator, { rating: currentItemRating }) =>
            ratingAccumulator + currentItemRating,
          0
        ) / product.numReviews;

      const addedReview = await product.save();

      res.status(201);
      res.json({ message: 'Review added!' });
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc get top rated products
// @route GET /api/products/top
// @access Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (topProducts) {
    res.json(topProducts);
  } else {
    res.status(404);
    throw new Error('No product yet');
  }
});

export {
  getProducts,
  getTopRatedProducts,
  getProductById,
  deleteProductById,
  createNewProduct,
  updateProduct,
  addProductReview,
};
