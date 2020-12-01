import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [Products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {Products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
