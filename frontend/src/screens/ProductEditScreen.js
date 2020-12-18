import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productAction.js';
import { updateProduct } from '../actions/productListAction.js';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_UPDATE_RESET } from '../constants/productListConstants';

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

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/product-list');
    } else {
      if (!userInfo && !userInfo.isAdmin) {
        history.push('/login');
      } else {
        if (!product || product._id !== productId) {
          dispatch(productDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setBrand(product.brand);
          setCategory(product.category);
          setImage(product.image);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [history, userInfo, product, dispatch, productId, successUpdate]);

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
          <h1>Edit User</h1>

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
              <Form.Control
                type='text'
                value={image}
                placeholder='Enter product image URL'
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
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
