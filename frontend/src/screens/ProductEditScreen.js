import React, { useState, useEffect } from 'react';
import path from 'path';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productAction.js';
import { updateProduct } from '../actions/productListAction.js';
import { uploadImage } from '../actions/uploadImageAction.js';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_UPDATE_RESET } from '../constants/productListConstants';
import { UPLOAD_IMAGE_RESET } from '../constants/uploadImageConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetailsFromGlobalState = useSelector((state) => state.product);
  const { loading, error, product } = productDetailsFromGlobalState;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const uploadedImage = useSelector((state) => state.uploadImage);
  const {
    uploading: uploadingImage,
    error: errorUploading,
    imagePath,
  } = uploadedImage;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPLOAD_IMAGE_RESET });
      dispatch({ type: PRODUCT_UPDATE_RESET });

      history.push('/admin/product-list');
    } else {
      if (!userInfo || !userInfo.isAdmin) {
        history.push('/login');
      } else {
        if (!product || product._id !== productId) {
          dispatch(productDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setBrand(product.brand);
          setCategory(product.category);
          if (imagePath) {
            setImage(imagePath);
          } else {
            setImage(product.image);
          }

          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [
    history,
    userInfo,
    product,
    dispatch,
    productId,
    successUpdate,
    imagePath,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    dispatch(uploadImage(formData));
  };

  return (
    <>
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                placeholder='Enter product name'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                placeholder='Enter product price'
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                placeholder='Enter product brand'
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                placeholder='Enter product category'
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image URL</Form.Label>
              <img
                id='uploaded-image'
                src={path.join(path.resolve(), image)}
                alt='uploaded'
              />
              <Form.Control
                type='text'
                value={image}
                placeholder='Enter product image URL'
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploadingImage && <Loader />}
              {errorUploading && (
                <Message variant='danger'>{errorUploading}</Message>
              )}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='text'
                value={countInStock}
                placeholder='Enter product countInStock'
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                placeholder='Enter product description'
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};
export default ProductEditScreen;
