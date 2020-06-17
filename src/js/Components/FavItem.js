import React from 'react';
import ItemCard from '../../js/Components/ItemCard.js';

class FavItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products, favourite } = this.props;
    console.log(products, favourite);
    if (!products) {
      return null;
    }
    return (
      <section
        className={`product-catalogue__item-list ${
          favourite ? 'product-catalogue__item-list_favorite' : ''
        }`}
      >
        {products.map(item => (
          <ItemCard
            {...item}
            key={item.id}
            products={this.props.products}
            favourite
            updateFavorite={this.props.updateFavorite}
          />
        ))}
      </section>
    );
  }
}

export default FavItem;
