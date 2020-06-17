import React from 'react';
import Breadcrumbs from '../../js/Components/Breadcrumbs.js';
import { getData, getItem, getCart } from '../../js/script';
import OrderDone from '../../js/Components/OrderDone.js';
import OrderForm from '../../js/Components/OrderForm.js';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      orderDone: false,
    };
    this.order = {};
    this.postOrder = this.postOrder.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
    this.deсreaseCounter = this.deсreaseCounter.bind(this);
  }

  componentDidMount() {
    getData(`cart/${localStorage.getItem('cartId')}`)
      .then(result => {
        if (result) {
          this.getCartItems(result.data.products);
        } else {
          this.setState({ cart: null });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(p, s) {
    if (JSON.stringify(s) === JSON.stringify(this.state) && this.state.cart) {
      getData(`cart/${localStorage.getItem('cartId')}`)
        .then(result => {
          if (result) {
            this.getCartItems(result.data.products);
          } else {
            this.setState({ cart: null });
          }
        })
        .catch(err => console.log(err));
    }
  }

  getCartItems(cart) {
    if (cart) {
      const items = [];
      cart.forEach(item => items.push(getItem(item.id)));
      Promise.all(items).then(values => {
        for (let i = 0; i < cart.length; i += 1) {
          cart[i].item = values[i].data;
        }
        this.setState({ cart });
      });
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    const { productsInfo } = this.props;
    const { cart } = this.state;

    cart.map((item, i) => {
      if (!productsInfo[item.id]) {
        return null;
      }
      totalPrice += productsInfo[item.id].price * item.amount;
    });
    return totalPrice;
  }

  isValidElement(element) {
    return element.name && element.value;
  }

  formConfirmationData(elements) {
    return [].reduce.call(
      elements,
      (data, element) => {
        if (this.isValidElement(element)) {
          data[element.name] = element.value;
        }
        return data;
      },
      {}
    );
  }

  increaseCounter(i) {
    this.state.cart[i].amount += 1;
    this.props.changeCart(
      this.state.cart[i].id,
      this.state.cart[i].size,
      this.state.cart[i].amount
    );
  }

  deсreaseCounter(i) {
    if (this.state.cart[i].amount === 1) return;
    this.state.cart[i].amount -= 1;
    this.props.changeCart(
      this.state.cart[i].id,
      this.state.cart[i].size,
      this.state.cart[i].amount
    );
  }

  postOrder(event) {
    event.preventDefault();
    window.scroll(0, 0);
    const confirmationData = this.formConfirmationData(this.formData.elements);
    confirmationData.paymentType = this.formData.paymentType.value;
    confirmationData.cart = localStorage.getItem('cartId');
    getData('order', 'POST', confirmationData).then(result => {
      this.order = result.data;
      this.setState({ orderDone: true });
    });
  }

  render() {
    const { orderDone, cart } = this.state;
    const { cartId, cartItems, productsInfo } = this.props;
    if (!cart) return null;
    return (
      <div className="wrapper order-wrapper">
        <Breadcrumbs title="Оформление заказа" url="/Order/" category="Заказ" />
        {orderDone ? (
          <OrderDone
            order={this.order}
            getTotalPrice={this.getTotalPrice}
            cartId={this.props.cartId}
            cartItems={this.props.cartItems}
            emptyCart={this.props.emptyCart}
          />
        ) : (
          <OrderForm
            productsInfo={this.props.productsInfo}
            form={el => (this.formData = el)}
            postOrder={this.postOrder}
            cart={this.props.cart}
            getTotalPrice={this.getTotalPrice}
            increaseCounter={this.increaseCounter}
            deсreaseCounter={this.deсreaseCounter}
          />
        )}
      </div>
    );
  }
}

export default Order;
