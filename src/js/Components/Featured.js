import React from 'react';
import FeaturedSlider from '../../js/Components/FeaturedSlider.js';
import { Link } from 'react-router-dom';
import { getData } from '../../js/script';

class Featured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
      categories: [],
      currentCategory: '',
      currentItem: 1,
    };
  }

  componentDidMount() {

    getData(`categories`).then(result => {
      this.setState({
        categories: result.data,
      });
    });

    getData(`featured`).then(result => {
      this.setState({
        featured: result.data,
      });
    });
  }

  render() {
    const {
      categories,
      featured,
      currentCategory,
      currentItem,
      error,
    } = this.state;

    if (error) return <div>{`Error: ${error.message}`}</div>;
    if (!featured) {
      return null;
    }
    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {categories.map(item => (
              <li className="new-deals__menu-item" key={item.id}>
                <a href="" onClick={() => this.setFilter(item.id)}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FeaturedSlider featured={this.state.featured} />
        </div>
      </section>
    );
  }
}

export default Featured;
