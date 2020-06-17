import React from 'react';
import Breadcrumbs from '../../js/Components/Breadcrumbs.js';
import Preloader from '../../js/Components/Preloader';
import OverlookedSlider from '../../js/Components/OverlookedSlider';
import SimilarProducts from '../../js/Components/SimilarProducts';
import {
  getFavourite,
  setFavourite,
  getData,
  // changeCart
} from '../../js/script';
import { setLooked } from '../../js/script';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      size: null,
      card: null,
      currentItem: this.props.match.params.id,
      currentImage: 0,
      categories: [],
      products: [],
      loading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: true });
    const item = this.props.match.params.id;
    getData(`products/${item}`).then(result => {
      this.setState({
        card: result.data,
        loading: false,
      });
    });

    getData('categories').then(result => {
      this.setState({
        categories: result.data,
        loading: false,
      });
    });

    getData('products').then(result => {
      this.setState({
        products: result.data,
        loading: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.state.currentItem) {
      this.setState({ currentItem: nextProps.match.params.id });
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.state.currentItem) {
      this.setState({ loading: true });
      const item = this.props.match.params.id;
      getData(`products/${item}`).then(result => {
        this.setState({
          card: result.data,
          loading: false,
        });
      });

      getData('categories').then(result => {
        this.setState({
          categories: result.data,
          loading: false,
        });
      });

      getData('products').then(result => {
        this.setState({
          products: result.data,
          loading: false,
        });
      });
    }
  }

  changeImage(i) {
    const { card } = this.state;
    if (i === card.images.length) {
      i = 0;
    }
    if (i < 0) {
      i = card.images.length - 1;
    }
    this.setState({ currentImage: i });
  }

  changeSize(size) {
    this.setState({
      size: size,
    });
  }

  increaseCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  deсreaseCounter() {
    if (this.state.counter === 1) {
      return;
    }
    this.setState({ counter: this.state.counter - 1 });
  }

  addToFavourite(event, id) {
    event.preventDefault();
    setFavourite(id, [this.state.card]);
    this.setState({});
  }

  addToCart(counter, size) {
    window.scrollTo(0, 0);
    this.props
      .changeCart(this.state.card.id, size.size, counter)
      .catch(err => console.log(err));
  }

  render() {
    const { card, currentImage, loading, error } = this.state;
    if (!card) return null;
    setLooked(card.id, card);
    if (loading) return <Preloader />;
    if (error) return <div>{`Error: ${error.message}`}</div>;
    return (
      <div style={{ overflowX: 'hidden' }}>
        <Breadcrumbs
          category="Каталог"
          url="/Catalog/"
          urlType={`/catalog?type=${this.state.card.type}`}
          type={card.type}
          title={card.title}
        />

        <main className="product-card" style={{ overflowX: 'hidden' }}>
          <section className="product-card-content" style={{ margin: '0 6%' }}>
            <h2 className="section-name">{card.title}</h2>
            <section className="product-card-content__main-screen">
              <section className="main-screen__favourite-product-slider">
                <div
                  className={`favourite-product-slider ${
                    card.images.length === 1 ? 'hidden' : ''
                  }`}
                >
                  <div
                    className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up
                    ${
                      this.state.currentImage === 0 || card.images.length < 3
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={() => this.changeImage(currentImage - 1)}
                  />
                  {card.images.map((image, i) => (
                    <div
                      className={`favourite-product-slider__item favourite-product-slider__item-${i +
                        1}`}
                      style={{
                        backgroundImage: `url(${image})`,
                        maxWidth: '100%',
                        maxHeigth: '100%',
                        backgroundSize: 'cover',
                      }}
                      key={i}
                      onClick={() => this.changeImage(i)}
                    >
                      <a href="" />
                    </div>
                  ))}
                  <div
                    className={`favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down
                    ${
                      this.state.currentImage === card.images.length ||
                      card.images.length < 3
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={() => this.changeImage(currentImage + 1)}
                  />
                </div>
              </section>

              <div className="main-screen__favourite-product-pic">
                <img
                  src={card.images[currentImage]}
                  alt=""
                  style={{
                    maxwidth: '80%',
                    maxHeight: '80%',
                    backgroundSize: 'contain',
                  }}
                />
                <a
                  href=""
                  className="main-screen__favourite-product-pic__zoom"
                />
              </div>

              <div
                className="main-screen__product-info"
                style={{ marginLeft: '10%' }}
              >
                <div className="product-info-title">
                  <h2>{card.title}</h2>
                  <div className="in-stock">
                    {!card.sizes[0] ? 'Нет в наличии' : 'В наличии'}
                  </div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <tbody>
                      <tr>
                        <td className="left-col">Артикул:</td>
                        <td className="right-col">{card.sku}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Производитель:</td>
                        <td className="right-col">
                          <a href="">
                            <span className="producer">{card.brand}</span>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="left-col">Цвет:</td>
                        <td className="right-col">{card.color}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Материалы:</td>
                        <td className="right-col">{card.material}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Сезон:</td>
                        <td className="right-col">{card.season}</td>
                      </tr>
                      <tr>
                        <td className="left-col">Повод:</td>
                        <td className="right-col">{card.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {card.sizes.map((size, i) => {
                    return size.available ? (
                      <li
                        className={`${
                          size === this.state.size ? 'active' : ''
                        }`}
                        key={i}
                        onClick={() => this.changeSize(size)}
                      >
                        <a>{size.size}</a>
                      </li>
                    ) : null;
                  })}
                </ul>
                <div className="size-wrapper">
                  <a href="">
                    <span className="size-rule" />
                    <p className="size-table">Таблица размеров</p>
                  </a>
                </div>
                <a
                  className="in-favourites-wrapper"
                  onClick={event => this.addToFavourite(event, card.id)}
                >
                  <div
                    className={`${
                      getFavourite(card.id) ? 'favourite-chosen' : 'favourite'
                    }`}
                  />
                  <p className="in-favourites">
                    {`${
                      getFavourite(card.id) === 0
                        ? 'В избранное'
                        : 'В избранном'
                    }`}
                  </p>
                </a>
                <div className="basket-item__quantity">
                  <div
                    className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                    onClick={() => this.deсreaseCounter()}
                  >
                    -
                  </div>
                  {this.state.counter}
                  <div
                    className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                    onClick={() => {
                      this.increaseCounter();
                    }}
                  >
                    +
                  </div>
                </div>
                <div className="price">{card.price * this.state.counter} ₽</div>
                <button
                  className={`in-basket in-basket-click ${
                    !this.state.size ? ' in-basket_disabled' : ''
                  }`}
                  onClick={() =>
                    this.addToCart(this.state.counter, this.state.size)
                  }
                >
                  {!this.state.size ? 'ВЫБЕРИТЕ РАЗМЕР' : 'В корзину'}
                </button>
              </div>
            </section>
          </section>
        </main>
        <OverlookedSlider />

        <SimilarProducts product={card} />
      </div>
    );
  }
}

export default ProductCard;
