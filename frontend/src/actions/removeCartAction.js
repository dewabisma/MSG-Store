import axios from 'axios';
import { CART_REMOVE_ITEM } from '../constants/cartConstants';

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
