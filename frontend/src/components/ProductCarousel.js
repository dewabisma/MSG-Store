import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTopRatedProducts } from '../actions/productListAction';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.productTopRated);
  const { loading, products, error } = topRatedProducts;

  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' interval={99999999} className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id} className='carousel-item'>
          <Link
            to={`/product/${product._id}`}
            className='d-flex justify-content-center'
          >
            <Image
              src={product.image}
              alt={product.name}
              className='carousel-image'
            />

            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white'>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
