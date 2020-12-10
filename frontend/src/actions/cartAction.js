import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_ADD_PAYMENT_METHOD,
  CART_ADD_SHIPPING_ADDRESS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      product: data._id,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_ADD_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_ADD_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
