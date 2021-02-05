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
import { createProductReview } from '../actions/productListAction.js';
import { productDetails } from '../actions/productAction.js';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productListConstants';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productId = match.params.id;
  const dispatch = useDispatch();

  const theProduct = useSelector((state) => state.product);
  const { loading, error, product } = theProduct;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: productReviewSuccess,
    loading: productReviewLoading,
    error: productReviewError,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productReviewSuccess) {
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(productDetails(productId));
  }, [dispatch, productId, productReviewSuccess]);

  const cartSubmitHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();

    const review = {
      user: userInfo._id,
      name: userInfo.name,
      rating,
      comment,
    };

    dispatch(createProductReview(productId, review));

    setRating(0);
    setComment('');
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
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Product Review</h2>
              {productReviewSuccess && (
                <Message variant='success'>Review created successfully</Message>
              )}
              {productReviewLoading && <Loader />}
              {productReviewError && (
                <Message variant='danger'>{productReviewError}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitReviewHandler}>
                  <Form.Group controlId='Rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - bad</option>
                      <option value='2'>2 - fair</option>
                      <option value='3'>3 - good</option>
                      <option value='4'>4 - great</option>
                      <option value='5'>5 - Superb</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    disabled={productReviewLoading}
                    type='submit'
                    variant='primary'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
