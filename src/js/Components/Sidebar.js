import React from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../js/script';

const htmlColors = {
  Черный: '#000000',
  Бежевый: '#AC9362',
  Серый: '#808080',
  Бардо: '#7B002C',
  Белый: '#FFFFFF',
  Прозрачный: 'transparent',
  Синий: '#0000FF',
  Красный: '#DC143C',
  'Темно-салатовый': '#00FA9A',
  Фиолетовый: '#9400D3',
  Беж: '#AC9362',
  Оранжевый: '#FFA500',
  Металлик: '#B0C4DE',
  Разноцветные: 'rgba(255, 255, 255, 0.1)',
  Коричневый: '#A52A2A',
  Серебряный: '#C0C0C0',
  'Черно-белый': 'rgba(255, 255, 255, 0.1)',
  Розовый: '#FF69B4',
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    getData('filters').then(result => {
      this.setState({
        filters: result.data,
        loading: false,
      });
    });
  }

  changePrice(event) {
    if (event.currentTarget.type === 'number') {
      if (Number(this.maxPriceLabel.value) > Number(this.minPriceLabel.value)) {
        this.maxPrice.value = this.maxPriceLabel.value;
        this.minPrice.value = this.minPriceLabel.value;
      }
      if (
        Number(this.maxPriceLabel.value) < Number(this.minPriceLabel.value) &&
        event.currentTarget === this.maxPriceLabel
      ) {
        this.maxPrice.value = this.maxPriceLabel.value;
        this.minPrice.value = this.minPriceLabel.value = this.maxPriceLabel.value;
      }
      if (
        Number(this.maxPriceLabel.value) < Number(this.minPriceLabel.value) &&
        event.currentTarget === this.minPriceLabel
      ) {
        this.maxPrice.value = this.maxPriceLabel.value = this.minPriceLabel.value;
        this.minPrice.value = this.minPriceLabel.value;
      }
    } else {
      this.maxPriceLabel.value = this.maxPrice.value;
      this.minPriceLabel.value = this.minPrice.value;
      if (event.currentTarget === this.maxPrice) {
        if (Number(this.maxPrice.value) < Number(this.minPrice.value)) {
          this.minPrice.value = this.maxPrice.value;
        }
      } else if (Number(this.minPrice.value) > Number(this.maxPrice.value)) {
        this.maxPrice.value = this.minPrice.value;
      }
    }
    this.coloredLine.style.width = `${((this.maxPrice.value -
      this.minPrice.value) /
      60000) *
      100}%`;
    this.coloredLine.style.left = `${(this.minPrice.value / 60000) * 100}%`;
  }

  render() {
    const { filters } = this.state;
    const { filterSelect } = this.props;
    if (!filters) {
      return null;
    }
    return (
      <section className="sidebar" style={{ marginLeft: '10px' }}>
        <section className="sidebar__division">
          <div className="sidebar__catalogue-list">
            <div className="sidebar__division-title">
              <h3>Каталог</h3>
              <div className="opener-down" />
            </div>

            <ul
              ref={elem => (this.type = elem)}
              onClick={() => this.type.classList.toggle('chosen')}
            >
              {Object.keys(filters).map((type, key) => {
                return (
                  <li key={key}>
                    <Link to={`/catalog?type=${filters.type[key]}`}>
                      {filters.type[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-1" />
        <section className="sidebar__division">
          <div
            className="sidebar__price"
            ref={elem => (this.price = elem)}
            onClick={() => this.price.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Цена</h3>
              <div className="opener-down" />
            </div>
            <div className="price-slider">
              <div className="circle-container">
                <input
                  className="range-1"
                  type="range"
                  min="0"
                  max="30000"
                  defaultValue="0"
                  step="1"
                  ref={input => (this.minPrice = input)}
                  onInput={event => this.changePrice(event)}
                  onMouseUp={() =>
                    filterSelect({ minPrice: this.minPrice.value })
                  }
                />
                <div className="line-white" />
                <div
                  className="line-colored"
                  ref={line => (this.coloredLine = line)}
                />
                <input
                  className="range-2"
                  type="range"
                  min="30001"
                  max="60000"
                  defaultValue="60000"
                  step="1"
                  ref={input => (this.maxPrice = input)}
                  onInput={event => this.changePrice(event)}
                  onMouseUp={() =>
                    filterSelect({ maxPrice: this.maxPrice.value })
                  }
                />
              </div>
              <div className="counter">
                <input
                  type="number"
                  className="input-1"
                  defaultValue="0"
                  ref={input => (this.minPriceLabel = input)}
                  onBlur={event => this.changePrice(event)}
                  onChange={event =>
                    (event.currentTarget.value = Number(
                      event.currentTarget.value
                    ))
                  }
                />
                <div className="input-separator" />
                <input
                  type="number"
                  className="input-2"
                  defaultValue="60000"
                  ref={input => (this.maxPriceLabel = input)}
                  onBlur={event => this.changePrice(event)}
                  onChange={event =>
                    (event.currentTarget.value = Number(
                      event.currentTarget.value
                    ))
                  }
                />
              </div>
            </div>
          </div>
        </section>
        <div className="separator-150 separator-150-2" />
        <section className="sidebar__division">
          <div
            className="sidebar__color"
            ref={elem => (this.color = elem)}
            onClick={() => this.color.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Цвет</h3>
              <div className="opener-down" />
            </div>
            <ul>
              {Object.keys(filters).map((color, key) => {
                const colorStyle = {
                  backgroundColor: htmlColors['filters.color[key]'],
                };
                return (
                  <li key={key}>
                    <Link to={`/catalog?color=${filters.color[key]}`}>
                      <div
                        className={`color ${filters.color[key]}`}
                        style={{
                          backgroundColor: `${htmlColors[filters.color[key]]}`,
                        }}
                      />
                      <span className="color-name">{filters.color[key]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-3" />
        <section className="sidebar__division">
          <div
            className="sidebar__size"
            ref={elem => (this.size = elem)}
            onClick={() => this.size.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Размер</h3>
              <div className="opener-down" />
            </div>
            <ul>
              <div className="list-1">
                {Object.keys(filters).map((sizes, key) => {
                  return key % 2 === 0 ? (
                    <li key={key}>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={`checkbox-${filters.sizes[key]}`}
                          onChange={event => {
                            event.preventDefault();
                            return (window.location.href = `/catalog?size=${
                              filters.sizes[key]
                            }`);
                          }}
                        />
                        <span className="checkbox-custom" />{' '}
                        <span className="label">{filters.sizes[key]}</span>
                      </label>
                    </li>
                  ) : null;
                })}
              </div>

              <div className="list-2">
                {Object.keys(filters).map((sizes, key) => {
                  return key % 2 !== 0 ? (
                    <li key={key}>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={`checkbox-${filters.sizes[key]}`}
                          onChange={event => {
                            event.preventDefault();
                            return (window.location.href = `/catalog?size=${
                              filters.sizes[key]
                            }`);
                          }}
                        />
                        <span className="checkbox-custom" />{' '}
                        <span className="label">{filters.sizes[key]}</span>
                      </label>
                    </li>
                  ) : null;
                })}
              </div>
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-4" />
        <section className="sidebar__division">
          <div
            className="sidebar__heel-height"
            ref={elem => (this.heelSize = elem)}
            onClick={() => this.heelSize.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Размер каблука</h3>
              <div className="opener-up" />
            </div>
            <ul style={{ overflowY: 'scroll' }}>
              <div className="list-1">
                {Object.keys(filters).map((heelSize, key) => {
                  return key % 2 === 0 ? (
                    <li key={key}>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={`checkbox-${filters.heelSize[key]}`}
                          onChange={event => {
                            event.preventDefault();
                            return (window.location.href = `/catalog?heelSize=${
                              filters.heelSize[key]
                            }`);
                          }}
                        />
                        <span className="checkbox-custom" />{' '}
                        <span className="label">{filters.heelSize[key]}</span>
                      </label>
                    </li>
                  ) : null;
                })}
              </div>

              <div className="list-2">
                {Object.keys(filters).map((heelSize, key) => {
                  return key % 2 !== 0 ? (
                    <li key={key}>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={`checkbox-${filters.heelSize[key]}`}
                          onChange={event => {
                            event.preventDefault();
                            return (window.location.href = `/catalog?heelSize=${
                              filters.heelSize[key]
                            }`);
                          }}
                        />
                        <span className="checkbox-custom" />{' '}
                        <span className="label">{filters.heelSize[key]}</span>
                      </label>
                    </li>
                  ) : null;
                })}
              </div>
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-5" />
        <section className="sidebar__division">
          <div
            className="sidebar__occasion"
            ref={elem => (this.reason = elem)}
            onClick={() => this.reason.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Повод</h3>
              <div className="opener-down" />
            </div>
            <ul>
              {Object.keys(filters).map((reason, key) => {
                return (
                  <li key={key}>
                    <Link to={`/catalog?reason=${filters.reason[key]}`}>
                      {filters.reason[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-6" />
        <section className="sidebar__division">
          <div
            className="sidebar__season"
            ref={elem => (this.season = elem)}
            onClick={() => this.season.classList.toggle('chosen')}
          >
            <div className="sidebar__division-title">
              <h3>Сезон</h3>
              <div className="opener-up" />
            </div>
            <ul>
              {Object.keys(filters).map((season, key) => {
                return (
                  <li key={key}>
                    <Link to={`/catalog?season=${filters.season[key]}`}>
                      {filters.season[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-7" />
        <section className="sidebar__division">
          <div
            className="sidebar__brand"
            ref={elem => (this.brand = elem)}
            onClick={() => this.brand.classList.toggle('chosen')}
          >
            <h3>Бренд</h3>
            <form
              className="brand-search"
              onSubmit={event => {
                event.preventDefault();
                return (window.location.href = `/catalog?brand=${
                  this.brandSearch.value
                }`);
              }}
            >
              <input
                ref={elem => (this.brandSearch = elem)}
                type="search"
                className="brand-search"
                id="brand-search"
                placeholder="Поиск"
              />
              <input type="submit" name="" value="" className="submit" />
            </form>
          </div>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              name="checkbox-disc"
              onClick={event =>
                filterSelect({
                  discounted: event.target.checked,
                })
              }
            />
            <span className="checkbox-discount" />{' '}
            <span className="text-discount">Со скидкой</span>
          </label>
          <div className="separator-240" />
        </section>

        <section className="sidebar__division">
          <div className="drop-down">
            <Link to={`/catalog/`}>
              <span className="drop-down-icon" />
              Сбросить
            </Link>
          </div>
        </section>
      </section>
    );
  }
}

export default Sidebar;
