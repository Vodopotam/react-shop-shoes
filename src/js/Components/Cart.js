import React from 'react';
import { Link } from 'react-router-dom';
import { getData, getItem } from '../../js/script';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProductsInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.props.fetchProductsInfo();
    }
  }

  removeItem(item) {
    const { cart, changeCart } = this.props;

    if (!cart || cart.length < 2) {
      this.props.emptyCart();
    } else {
      this.props.changeCart(item.id, item.size, 0);
    }
  }

  render() {
    const { cart, cartId, changeCart, productsInfo } = this.props;
    if (!cart || !cart.length) return null;

    return (
      <div className="hidden-panel__basket basket-dropped hidden-panel__basket_visible">
        {cart.length ? (
          <div className="basket-dropped__title">В вашей корзине:</div>
        ) : null}
        <div
          className={`basket-dropped__product-list ${
            cart.length <= 3 ? 'product-list_less' : 'product-list'
          } `}
        >
          {this.props.cart.map((item, i) => {
            if (!productsInfo[item.id]) {
              return null;
            }

            return (
              <div className="product-list__item" key={i}>
                <a
                  className="product-list__pic"
                  style={{
                    backgroundImage: `url(${productsInfo[item.id].images[0]})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                  }}
                />
                <Link to={`/item/${item.id}`} className="product-list__product">
                  {`${productsInfo[item.id].title}, (размер ${item.size}), ${
                    item.amount
                  } шт.`}
                </Link>
                <div className="product-list__fill" />
                <div className="product-list__price">
                  {productsInfo[item.id].price * item.amount}
                  <i className="fa fa-rub" aria-hidden="true" />
                </div>
                <div className="product-list__delete">
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => this.removeItem(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {cart.length ? (
          <Link className="basket-dropped__order-button" to="/order/">
            Оформить заказ
          </Link>
        ) : null}
      </div>
    );
  }
}

export default Cart;
