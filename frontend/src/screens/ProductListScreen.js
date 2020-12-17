import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productListAction.js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { PRODUCT_CREATE_RESET } from '../constants/productListConstants.js';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDeletingProduct,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdProduct,
    successDeletingProduct,
  ]);

  const deleteProductHandler = (productId) => {
    if (window.confirm('are you sure to delete this user?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='my-3'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button variant='primary' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}

      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button type='button' variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    type='button'
                    variant='danger'
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
