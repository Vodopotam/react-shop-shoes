import React from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../js/script';

class SimilarProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similarProducts: [],
      pages: 0,
      page: 1,
      loading: false,
    };
  }
  togglePage(target) {
    const { page, pages } = this.state;
    if (target === 'next') {
      this.setState({ page: page + 1 > pages ? 1 : page + 1 });
    }
    if (target === 'previous') {
      this.setState({ page: page - 1 === 0 ? pages : page - 1 });
    }
  }

  getSimilarProducts(item) {
    const { product } = this.props;
    this.setState({ loading: true });
    getData(`products?type=${item.type}&color=${item.color}`).then(result => {
      this.setState({
        similarProducts: result.data,
        pages: Math.ceil(result.data.length / 3),
        loading: false,
      })}
    );
  }

  componentWillUpdate(nextProps) {
    if (this.props.product.id !== nextProps.product.id) {
      this.getSimilarProducts(nextProps.product);
    }
  }

  componentDidMount() {
    const { product } = this.props;
    this.getSimilarProducts(product);
  }

  render() {
    const { similarProducts, page } = this.state;
    if (similarProducts.length < 2) return null;
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div
            className={`similar-products-slider__arrow similar-products-slider__arrow_left arrow
            	${similarProducts.length <= 3 ? 'hidden' : ''}`}
            onClick={() => this.togglePage('previous')}
          />
          {similarProducts.map((item, i) => {
            if (i < page * 3 && i >= page * 3 - 3) {
              return (
                <div
                  className="similar-products-slider__item-list__item-card item"
                  key={i}
                >
                  <div className="similar-products-slider__item">
                    <Link to={'/item/' + item.id}>
                      <img
                        src={item.images[0]}
                        className="similar-products-slider__item-pic-1"
                        alt={item.title}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </Link>
                  </div>
                  <div className="similar-products-slider__item-desc">
                    <h4 className="similar-products-slider__item-name">
                      {item.title}
                    </h4>
                    <p className="similar-products-slider__item-producer">
                      Производитель:{' '}
                      <span className="producer">{item.brand}</span>
                    </p>
                    <p className="similar-products-slider__item-price">
                      {item.price}
                    </p>
                  </div>
                </div>
              );
            } else return null;
          })}

          <div
            className={`similar-products-slider__arrow similar-products-slider__arrow_right arrow
            	${similarProducts.length <= 3 ? 'hidden' : ''}`}
            onClick={() => this.togglePage('next')}
          />
        </div>
      </section>
    );
  }
}

export default SimilarProducts;
