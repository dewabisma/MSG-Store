import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createProductReducer,
  deleteProductReducer,
  productListReducer,
  updateProductReducer,
  createProductReviewReducer,
  topRatedProductsReducer,
} from './reducers/productListReducer.js';
import { productReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  listUserOrdersReducer,
  listAllUsersOrdersReducer,
  orderDeliverReducer,
} from './reducers/orderReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  deleteUserReducer,
  userUpdateReducer,
} from './reducers/userReducer.js';
import { uploadImageReducer } from './reducers/uploadImageReducer.js';

const reducer = combineReducers({
  productList: productListReducer,
  productDelete: deleteProductReducer,
  productCreate: createProductReducer,
  productUpdate: updateProductReducer,
  productReviewCreate: createProductReviewReducer,
  product: productReducer,
  productTopRated: topRatedProductsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userOrders: listUserOrdersReducer,
  userList: userListReducer,
  deletedUser: deleteUserReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreated: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: listAllUsersOrdersReducer,
  uploadImage: uploadImageReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
