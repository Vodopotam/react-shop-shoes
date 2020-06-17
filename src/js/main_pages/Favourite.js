import React from 'react';
import Breadcrumbs from '../../js/Components/Breadcrumbs.js';
import FavItem from '../../js/Components/FavItem.js';

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: [],
      amount: null,
      currentPage: 1,
      itemsPerPage: 12,
    };
    this.updateFavorite = this.updateFavorite.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    window.scrollTo(0, this.favouriteTop.offsetTop);
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleArrowRight(event) {
    event.preventDefault();
    window.scrollTo(0, this.favouriteTop.offsetTop);
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  handleArrowLeft(event) {
    event.preventDefault();
    window.scrollTo(0, this.favouriteTop.offsetTop);
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }
  componentDidMount() {
    this.updateFavorite();
  }

  updateFavorite() {
    const favourite = localStorage.getItem('favourite');
    if (favourite) {
      const parsed = JSON.parse(favourite);
      this.setState({
        favourite: parsed,
      });
    }
  }

  sortBy = event => {
    const type = this.selected.options[this.selected.selectedIndex].value;
    console.log(type);
    const { favourite } = this.state;
    console.log(favourite);
    const sorted = [].slice.call(favourite).sort((a, b) => {
      if (a[type] === b[type]) {
        return 0;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return -1;
    });

    this.setState({ favourite: sorted });
  };

  render() {
    const { favourite, currentPage, amount, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = favourite.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(favourite.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="container">
        <div className="wrapper wrapper_favorite">
          <Breadcrumbs title="Избранное" />
          {favourite.length ? (
            <main
              className="product-catalogue product-catalogue_favorite"
              ref={elem => (this.favouriteTop = elem)}
            >
              <section className="product-catalogue__head product-catalogue__head_favorite">
                <div className="product-catalogue__section-title">
                  <h2 className="section-name">В вашем избранном</h2>
                  <span className="amount amount_favorite">
                    {favourite.length} товаров
                  </span>
                </div>
                <div className="product-catalogue__sort-by">
                  <p className="sort-by">Сортировать</p>
                  <select
                    id="sorting"
                    name=""
                    onChange={this.sortBy}
                    ref={elem => (this.selected = elem)}
                  >
                    <option value="price">по цене</option>
                    <option value="brand">по производителю</option>
                  </select>
                </div>
              </section>
              <FavItem
                products={currentItems}
                favourite
                updateFavourite={this.getFavourite}
              />

              <div className="product-catalogue__pagination">
                <div className="page-nav-wrapper">
                  <div
                    className={`angle-back ${
                      this.state.currentPage === 1 ? 'hidden' : ''
                    } `}
                    onClick={this.handleArrowLeft.bind(this)}
                  >
                    <a href="" />
                  </div>
                  <ul id="pageNumbers">
                    {pageNumbers.map(number => (
                      <li
                        className={`${number === currentPage ? 'active' : ''}`}
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`angle-forward ${
                      this.state.currentPage === pageNumbers.length
                        ? 'hidden'
                        : ''
                    } `}
                    onClick={this.handleArrowRight.bind(this)}
                  >
                    <a href="" />
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <h1>В Вашем избранном пока ничего нет</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Favourite;
