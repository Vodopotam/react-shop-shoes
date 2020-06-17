import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './css/style.css';
import './css/style-product-card.css';
import './css/style-order.css';
import './css/style-favorite.css';
import './css/style-catalogue.css';
import './css/normalize.css';
import './css/font-awesome.min.css';

import MainPage from './js/main_pages/MainPage';
import Catalog from './js/main_pages/Catalog';
import ProductCard from './js/main_pages/ProductCard';
import Favourite from './js/main_pages/Favourite';
import Order from './js/main_pages/Order.js';
import Header from './js/Components/Header.js';
import Footer from './js/Components/Footer.js';
import { getData, getItem } from './js/script';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartId: null,
      cartItems: '',
      productsInfo: {},
    };
  }

  componentDidMount() {
    const lastCartId = localStorage.getItem('cartId');

    if (!lastCartId) {
      return null;
    }

    getData(`cart/${lastCartId}`).then(response => {
      if (!response) {
        this.setState({
          cartId: null,
        });
      } else {
        this.setState({
          cart: response.data.products || [],
          cartItems: response.data.products ? response.data.products.length : 0,
          cartId: response.data.id,
        });
      }
    });
  }

  fetchProductsInfo = () => {
    const { cart } = this.state;

    if (!cart || !cart.length) {
      return;
    }
    const { productsInfo } = this.state;

    let newProductsInfo = {};
    let productsInfoPromises = [];
    cart.forEach(item => productsInfoPromises.push(getItem(item.id)));
    Promise.all(productsInfoPromises).then(values => {
      console.log(values);
      values.forEach(value => {
        const id = value.data.id;
        newProductsInfo[id] = value.data;
      });

      this.setState({
        productsInfo: {
          ...productsInfo,
          ...newProductsInfo,
        },
      });
    });
  };

  changeCart = async (id, size, amount) => {
    const addedProduct = { id, size, amount };

    let cartId = this.state.cartId;

    const addCartResponse = await getData(
      `cart/${cartId || ''}`,
      'POST',
      addedProduct
    );

    cartId = addCartResponse.data.id;
    localStorage.setItem('cartId', cartId);

    const cartResponse = await getData(`cart/${cartId}`, 'GET');

    this.setState({
      cart: cartResponse.data.products,
      cartItems: cartResponse.data.products.length,
      cartId: cartResponse.data.id,
    });
  };

  emptyCart = () => {
    this.setState({
      cart: [],
      cartId: '',
      cartItems: '',
    });

    localStorage.setItem('cartId', '');
  };

  getProductCard(props) {
    return <ProductCard {...props} changeCart={this.changeCart} />;
  }

  render() {
    const { cart, cartId, cartItems, order, productsInfo } = this.state;
    if (!cart || !productsInfo) return null;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Header
            {...this.state}
            {...this.props}
            changeCart={this.changeCart}
            emptyCart={this.emptyCart}
            fetchProductsInfo={this.fetchProductsInfo}
          />
          <Switch>
            <Route path="/catalog/" component={Catalog} />
            <Route path="/catalog/:category" component={Catalog} />
            <Route
              path="/item/:id"
              render={(props, state) => this.getProductCard(props, state)}
            />
            <Route path="/favourite/" component={Favourite} />
            <Route path="/order/">
              <Order
                {...this.state}
                {...this.props}
                changeCart={this.changeCart}
                emptyCart={this.emptyCart}
                fetchProductsInfo={this.fetchProductsInfo}
              />
            </Route>
            <Route path="/" component={MainPage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
