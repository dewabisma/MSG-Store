import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Products from '../products';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {Products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
