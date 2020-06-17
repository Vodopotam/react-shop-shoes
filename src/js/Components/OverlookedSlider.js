import React from 'react';
import { Link } from 'react-router-dom';
import { getLooked, setLooked } from '../../js/script';

class OverlookedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      looked: getLooked(),
      secondPage: false,
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidUpdate() {
    if (JSON.stringify(this.state.looked) !== JSON.stringify(getLooked())) {
      this.setState({ looked: getLooked() });
    }
  }

  changePage() {
    if (this.state.looked.length > 5)
      this.setState({ secondPage: !this.state.secondPage });
  }

  render() {
    const { looked } = this.state;
    if (looked.length === 0) return null;
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div
            className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"
            onClick={this.changePage}
          />
          {looked.map((item, i) => {
            if (i > 4 && !this.state.secondPage) return null;
            if (i < 5 && !!this.state.secondPage) return null;
            return (
              <div
                className={`overlooked-slider__item overlooked-slider__item-{i + 1}`}
                key={i}
                style={{ backgroundImage: `url(${item.images[0]})` }}
              >
                <Link to={`/item/${item.id}`} />
              </div>
            );
          })}

          <div
            className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"
            onClick={this.changePage}
          />
        </div>
      </section>
    );
  }
}

export default OverlookedSlider;
