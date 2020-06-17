import React from 'react';
import { Link } from 'react-router-dom';
import { getFavourite, setFavourite, getData } from '../../js/script';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: 0,
      availableSizes: [],
    };
  }

  componentDidMount() {
    const item = this.props.id;
    getData(`products/${item}`).then(result => {
      this.setState({
        availableSizes: result.data.sizes,
      });
    });
  }

  slideImage(arrow) {
    let { currentImage } = this.state;
    let nextImage = currentImage + 1;
    let previousImage = currentImage - 1;
    if (arrow) {
      if (currentImage + 1 === this.props.images.length) {
        nextImage = 0;
      }
      this.setState({
        currentImage: nextImage,
      });
    } else {
      if (currentImage === 0) {
        previousImage = this.props.images.length - 1;
      }
      this.setState({
        currentImage: previousImage,
      });
    }
  }

  handleArrowClick(event) {
    event.preventDefault();
    this.slideImage(this.arrowRight);
  }

  addToFavourite(event, id) {
    event.preventDefault();
    setFavourite(id, this.props.products);
    this.setState({});
  }

  render() {
    const { currentImage, availableSizes } = this.state;
    const { images, title, price, brand, id } = this.props;
    const sizes = availableSizes.map((item, i) => item.size).join(', ');
    return (
      <Link className="item-list__item-card item" to={`/item/${id}`} key={id}>
        <div className="item-pic">
          <img
            className="item-pic-1"
            src={images[currentImage]}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              backgroundSize: 'contain',
            }}
          />
          <div
            className={`${
              getFavourite(id)
                ? 'product-catalogue__product_favorite-chosen'
                : 'product-catalogue__product_favorite'
            }`}
            onClick={event => this.addToFavourite(event, id)}
          >
            <p />
          </div>
          {images.length > 1 ? (
            <div>
              <div
                className="arrow arrow_left"
                onClick={event => this.handleArrowClick(event)}
              />
              <div
                ref={elem => (this.arrowRight = elem)}
                className="arrow arrow_right"
                onClick={event => this.handleArrowClick(event)}
              />
            </div>
          ) : null}
        </div>
        <div className="item-desc">
          <h4 className="item-name">{title}</h4>
          <p className="item-producer">
            Производитель: <span className="producer">{brand}</span>
          </p>
          <p className="item-price">{price}</p>
          <div className="sizes">
            <p className="sizes__title">Размеры в наличии:</p>
            <p className="sizes__avalible">{sizes}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default ItemCard;
