import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/user-list' component={UserListScreen} />
          <Route path='/admin/users/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/product-list'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/product-list/:pageNumber'
            component={ProductListScreen}
          />
          <Route
            path='/admin/products/:id/edit'
            component={ProductEditScreen}
          />
          <Route path='/admin/order-list' component={OrderListScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
