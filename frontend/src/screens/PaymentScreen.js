import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction.js';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              value='PayPal'
              id='PayPal'
              name='paymentMethod'
              label='PayPal or Credit Card'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
