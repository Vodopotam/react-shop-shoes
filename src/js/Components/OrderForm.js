import React from 'react';
import { Link } from 'react-router-dom';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {
        name: '',
        phone: '',
        address: '',
        paymentType: 'onlineCard',
      },
    };
  }

  setClientData = () => {
    const { client } = this.state;
    client.name = this.name.value;
    client.phone = this.phone.value;
    client.email = this.email.value;
    client.address = this.address.value;
    this.setState({ client });
  };

  getButtonClassName = () => {
    let buttonClassName =
      'order-process__form-submit order-process__form-submit_click';
    const { client } = this.state;
    if (!client.name || !client.phone || !client.email || !client.address)
      buttonClassName += ' order-process__form-submit_disabled';
    return buttonClassName;
  };
  render() {
    const { cart, productsInfo } = this.props;
    const { client } = this.state;

    console.log(productsInfo);
    if (!productsInfo || !cart) return null;
    return (
      <section className="order-process">
        <h2 className="order-process__title">Оформление заказа</h2>
        <div className="order-process__basket order-basket">
          <div className="order-basket__title">в вашей корзине:</div>
          <div className="order-basket__item-list">
            {this.props.cart.map((item, i) => {
              if (!productsInfo[item.id]) {
                return null;
              }
              return (
                <div className="basket-item" key={i}>
                  <div className="basket-item__pic">
                    <img
                      src={productsInfo[item.id].images[0]}
                      alt="product"
                      style={{
                        backgroundPosition: '50%',
                        backgroundSize: 'contain',
                        maxHeight: '100%',
                        maxWidth: '75%',
                      }}
                    />
                  </div>

                  <div className="basket-item__product">
                    <div className="basket-item__product-name">
                      <Link to={'/item/' + item.id}>{item.title}</Link>
                    </div>
                    <div className="basket-item__product-features">
                      <div className="basket-item__size">
                        Размер: <span>{item.size}</span>
                      </div>
                      <div className="basket-item__producer">
                        Производитель:{' '}
                        <span>{productsInfo[item.id].brand}</span>
                      </div>
                      <div className="basket-item__color">
                        Цвет: <span>{productsInfo[item.id].color}</span>
                      </div>
                    </div>
                  </div>

                  <div className="basket-item__quantity">
                    <div
                      className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                      onClick={() => this.props.deсreaseCounter(i)}
                    >
                      -
                    </div>
                    {item.amount}
                    <div
                      className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                      onClick={() => this.props.increaseCounter(i)}
                    >
                      +
                    </div>
                  </div>

                  <div className="basket-item__price">
                    {productsInfo[item.id].price * item.amount}{' '}
                    <i className="fa fa-rub" aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-basket__summ">
            Итого:
            <span>
              {this.props.getTotalPrice()}{' '}
              <i className="fa fa-rub" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="order-process__confirmed">
          <form onSubmit={this.props.postOrder} ref={this.props.form}>
            <div className="order-process__delivery">
              <h3 className="h3">кому и куда доставить?</h3>
              <div className="order-process__delivery-form">
                <label className="order-process__delivery-label">
                  <div className="order-process__delivery-text">Имя</div>
                  <input
                    ref={elem => (this.name = elem)}
                    className="order-process__delivery-input"
                    type="text"
                    name="name"
                    placeholder="Представьтесь, пожалуйста"
                    value={this.state.client.name}
                    onChange={this.setClientData.bind(this)}
                    required
                  />
                </label>
                <label className="order-process__delivery-label">
                  <div className="order-process__delivery-text">Телефон</div>
                  <input
                    ref={elem => (this.phone = elem)}
                    className="order-process__delivery-input"
                    type="tel"
                    name="phone"
                    placeholder="Номер в любом формате"
                    value={this.state.client.phone}
                    onChange={this.setClientData.bind(this)}
                    required
                  />
                </label>

                <label className="order-process__delivery-label">
                  <div className="order-process__delivery-text">E-mail</div>
                  <input
                    ref={elem => (this.email = elem)}
                    className="order-process__delivery-input"
                    type="email"
                    name="email"
                    placeholder="Укажите E-mail"
                    value={this.state.client.email}
                    onChange={this.setClientData.bind(this)}
                    required
                  />
                </label>

                <label className="order-process__delivery-label order-process__delivery-label_adress">
                  <div className="order-process__delivery-text">Адрес</div>
                  <input
                    ref={elem => (this.address = elem)}
                    className="order-process__delivery-input order-process__delivery-input_adress"
                    type="text"
                    name="address"
                    placeholder="Ваша покупка будет доставлена по этому адресу"
                    value={this.state.client.address}
                    onChange={this.setClientData.bind(this)}
                    required
                  />
                </label>
              </div>

              <p>
                Все поля обязательны для заполнения. Наш оператор свяжется с
                вами для уточнения деталей заказа.
              </p>
            </div>
            <div className="order-process__paid">
              <h3 className="h3">
                хотите оплатить онлайн или курьеру при получении?
              </h3>

              <div className="order-process__paid-form">
                <label className="order-process__paid-label">
                  <input
                    className="order-process__paid-radio"
                    type="radio"
                    name="paymentType"
                    value="onlineCard"
                    required
                  />
                  <span className="order-process__paid-text">
                    Картой онлайн
                  </span>
                </label>
                <label className="order-process__paid-label">
                  <input
                    className="order-process__paid-radio"
                    type="radio"
                    name="paymentType"
                    value="offlineCard"
                  />
                  <span className="order-process__paid-text">
                    Картой курьеру
                  </span>
                </label>

                <label className="order-process__paid-label">
                  <input
                    className="order-process__paid-radio"
                    type="radio"
                    name="paymentType"
                    value="offlineCash"
                  />
                  <span className="order-process__paid-text">
                    Наличными курьеру
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className={this.getButtonClassName()}>
              Подтвердить заказ
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default OrderForm;
