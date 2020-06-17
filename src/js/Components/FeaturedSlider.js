import React from 'react';
import { Link } from 'react-router-dom';
import { getFavourite, setFavourite } from '../../js/script';

class FeaturedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      previous: 0,
      next: 2,
    };
  }

  getItem(point) {
    const last = this.props.featured.length;
    let { current, previous, next } = this.state;
    if (point === 'next') {
      current += 1;
      previous += 1;
      next += 1;
    }
    if (point === 'previous') {
      current -= 1;
      previous -= 1;
      next -= 1;
    }
    if (current === last) {
      current = 0;
    }
    if (current < 0) {
      current = last - 1;
    }
    if (previous === last) {
      previous = 0;
    }
    if (previous < 0) {
      previous = last - 1;
    }
    if (next === last) {
      next = 0;
    }
    if (next < 0) {
      next = last - 1;
    }
    this.setState({ current, previous, next });
  }

  getNextItem() {
    this.getItem('next');
  }
  getPreviousItem() {
    this.getItem('previous');
  }

  addToFavourite(event, id) {
    event.preventDefault();
    // this.favItem.classList.toggle('new-deals__product_favorite');
    // this.favItem.classList.toggle('new-deals__product_favorite-chosen');
    setFavourite(id, this.props.featured);
    this.setState({});
  }

  render() {
    const { current, next, previous } = this.state;
    const { featured } = this.props;
    if (!featured) {
      return null;
    }
    return (
      <div>
        {Object.keys(featured)
          .filter(key => key === '0')
          .map((key, i) => {
            return (
              <div key={key}>
                <div className="new-deals__slider">
                  <div
                    className="new-deals__arrow new-deals__arrow_left arrow"
                    onClick={() => {
                      this.getPreviousItem();
                    }}
                  />
                  <div
                    className="new-deals__product new-deals__product_first"
                    style={{
                      backgroundImage: `url(${featured[previous].images[0]})`,
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  >
                    <Link to={`/item/${featured[previous].id}`} />
                  </div>

                  <div
                    className="new-deals__product new-deals__product_active"
                    style={{
                      backgroundImage: `url(${featured[current].images[0]})`,
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  >
                    <Link to={`/item/${featured[current].id}`} />
                    <div
                      className={`${
                        getFavourite(featured[current].id)
                          ? 'new-deals__product_favorite-chosen'
                          : 'new-deals__product_favorite'
                      }`}
                      onClick={event =>
                        this.addToFavourite(event, featured[current].id)
                      }
                    />
                  </div>
                  <div
                    className="new-deals__product new-deals__product_last"
                    style={{
                      backgroundImage: `url(${featured[next].images[0]})`,
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  >
                    <Link to={`/item/${featured[next].id}`} />
                  </div>
                  <div
                    className="new-deals__arrow new-deals__arrow_right arrow"
                    onClick={() => {
                      this.getNextItem();
                    }}
                  />
                </div>

                <div className="new-deals__product-info">
                  <Link to={`/item/${featured[current].id}`} className="h3">
                    {featured[current].title}
                  </Link>
                  <p>
                    Производитель:
                    <span>{featured[current].brand}</span>
                  </p>
                  <h3 className="h3">{featured[current].price}</h3>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default FeaturedSlider;
