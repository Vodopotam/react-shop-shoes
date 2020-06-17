import React from 'react';
import { Link } from 'react-router-dom';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: null,
      loading: false,
      isOpenDropMenu: false,
    };
  }

  toggleOpenDropMenu() {
    this.setState({
      isOpenDropMenu: !this.state.isOpenDropMenu,
    });
  }
  componentDidMount() {
    this.setState({ loading: true });

    fetch(`https://api-neto.herokuapp.com/bosa-noga/filters`)
      .then(response => response.json())
      .then(result =>
        this.setState({
          filters: result.data,
          loading: false,
        })
      )
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, error: error });
      });
  }

  render() {
    const { filters } = this.state;
    const { currentCategory } = this.props;

    if (!filters) {
      return null;
    }
    return (
      <div
        className={`dropped-menu ${
          this.state.isOpenDropMenu ? 'dropped-menu__visible' : ''
        }`}
      >
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">повод:</h3>
            <ul className="dropped-menu__list">
              {Object.keys(filters).map((reason, i) => {
                const type = 'reason';
                return (
                  <li
                    className="dropped-menu__item"
                    key={i}
                    onClick={this.toggleOpenDropMenu.bind(this)}
                  >
                    <Link
                      to={`/catalog?categoryId=${currentCategory}&${type}=${
                        filters.reason[i]
                      }`}
                    >
                      {filters.reason[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">категории:</h3>
            <ul className="dropped-menu__list">
              {Object.keys(filters).map((type, i) => {
                const typeL = 'type';
                return (
                  <li
                    className="dropped-menu__item"
                    key={i}
                    onClick={this.toggleOpenDropMenu.bind(this)}
                  >
                    <Link
                      to={`/catalog?categoryId=${currentCategory}&${typeL}=${
                        filters.type[i]
                      }`}
                    >
                      {filters.type[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">сезон:</h3>
            <ul className="dropped-menu__list">
              {Object.keys(filters).map((season, i) => {
                const type = 'season';
                return (
                  <li
                    className="dropped-menu__item"
                    key={i}
                    onClick={this.toggleOpenDropMenu.bind(this)}
                  >
                    <Link
                      to={`/catalog?categoryId=${currentCategory}&${type}=${
                        filters.season[i]
                      }`}
                    >
                      {filters.season[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">бренды:</h3>

            <ul className="dropped-menu__list">
              {Object.keys(filters).map((brand, i) => {
                const type = 'brand';
                return (
                  <li
                    className="dropped-menu__item"
                    key={i}
                    onClick={this.toggleOpenDropMenu.bind(this)}
                  >
                    <Link
                      to={`/catalog?categoryId=${currentCategory}&${type}=${
                        filters.brand[i]
                      }`}
                    >
                      {filters.brand[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Все товары:</h3>

            <ul className="dropped-menu__list">
              <li
                className="dropped-menu__item"
                onClick={this.toggleOpenDropMenu.bind(this)}
              >
                <Link to={`/catalog?categoryId=${currentCategory}`}>
                  Все товары
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
