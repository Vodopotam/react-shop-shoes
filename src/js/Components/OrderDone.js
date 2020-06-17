import React from 'react';
import { Link } from 'react-router-dom';
import { getData, getItem, getCart } from '../../js/script';

class OrderDone extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('cartId');
    this.props.emptyCart();
  }

  render() {
    const { order, cartId } = this.props;
    return (
      <section className="order-done">
        <h2 className="order-done__title order-process__title">
          Заказ принят, спасибо!
        </h2>
        <div className="order-done__information order-info">
          <div className="order-info__item order-info__item_summ">
            <h3>Сумма заказа:</h3>
            <p>
              {this.props.getTotalPrice()}
              <i className="fa fa-rub" aria-hidden="true" />
            </p>
          </div>
          <div className="order-info__item order-info__item_pay-form">
            <h3>Способ оплаты:</h3>
            <p>{this.props.order.info.paymentType}</p>
          </div>
          <div className="order-info__item order-info__item_customer-name">
            <h3>Имя клиента:</h3>
            <p>{this.props.order.info.name}</p>
          </div>
          <div className="order-info__item order-info__item_adress">
            <h3>Адрес доставки:</h3>
            <p>{this.props.order.info.address}</p>
          </div>
          <div className="order-info__item order-info__item_phone">
            <h3>Телефон:</h3>
            <p>{this.props.order.info.phone}</p>
          </div>
        </div>
        <p className="order-done__notice">
          Данные о заказе отправлены на адрес{' '}
          <span>{this.props.order.info.email}</span>
        </p>
        <Link to="/catalog/" className="order-done__continue">
          продолжить покупки
        </Link>
      </section>
    );
  }
}

export default OrderDone;
