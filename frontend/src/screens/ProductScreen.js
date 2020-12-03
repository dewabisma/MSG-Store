import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productAction.js';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const productId = match.params.id;
  const dispatch = useDispatch();

  const theProduct = useSelector((state) => state.product);
  const { loading, error, product } = theProduct;

  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);

  const cartSubmitHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Image src={product.image} alt={product.name} fluid />
          )}
        </Col>
        <Col md={3}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <ListGroup>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={cartSubmitHandler}
                    className='btn-block'
                    type='button'
                    disabled={
                      product.countInStock === 0 ||
                      product.countInStock === undefined ||
                      product.countInStock === null
                    }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
