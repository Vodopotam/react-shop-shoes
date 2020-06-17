import React from 'react';
import Breadcrumbs from '../../js/Components/Breadcrumbs.js';
import ItemCard from '../../js/Components/ItemCard';
import Preloader from '../../js/Components/Preloader';
import Sidebar from '../../js/Components/Sidebar';
import OverlookedSlider from '../../js/Components/OverlookedSlider';
import Pagination from '../../js/Components/Pagination';
import { getData } from '../../js/script';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      pages: null,
      page: 1,
      products: [],
      categories: null,
      filters: {
        categoryId: '',
        color: '',
        sizes: [],
        heelSize: [],
        reason: '',
        season: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
      },
    };
    this.pageSelect = this.pageSelect.bind(this);
    this.filterSelect = this.filterSelect.bind(this);
    this.request = this.props.location.search;
  }

  componentDidMount() {
    const filters = Object.assign(
      {},
      this.state.filters,
      this.splitLocation(this.props.location)
    );
    const item = this.props.location.search;
    getData(`products/${item}`).then(result => {
      this.setState({
        products: result.data,
        amount: result.goods,
        pages: result.pages,
        filters,
      });
    });

    getData('categories').then(result => {
      this.setState({
        categories: result.data,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.request !== nextProps.location.search) {
      const filters = this.splitLocation(nextProps.location);
      this.filterSelect(filters, true);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.page !== nextState.page ||
      JSON.stringify(this.state.filters) !== JSON.stringify(nextState.filters)
    ) {
      const filters = Object.assign({}, nextState.filters);
      getData(`products/${this.request}`).then(result => {
        this.setState({
          products: result.data,
          amount: result.goods,
          pages: result.pages,
          filters,
        });
      });
    }
  }

  filterSelect(filter, isReset = false) {
    const filters = Object.assign({}, this.state.filters);
    if (isReset) {
      this.compileRequest(filter);
    } else if (!filter) {
      this.compileRequest(this.splitLocation(this.props.location));
    } else if (filter.size || filter.heelSize) {
      const filterName = Object.keys(filter)[0];
      if (filters[filterName]) {
        const index = filters[filterName].indexOf(filter[filterName]);
        index === -1
          ? filters[filterName].push(filter[filterName])
          : filters[filterName].splice(index, 1);
        this.compileRequest(filters);
      }
    } else {
      Object.assign(filters, filter);
      this.compileRequest(filters);
    }
  }

  pageSelect(page) {
    window.scrollTo(0, 0);
    this.compileRequest(this.state.filters, page);
  }

  compileRequest(filters, page = 1) {
    let request = '?';
    Object.keys(filters).forEach(key => {
      if (key === 'size' || key === 'heelSize') {
        if (filters[key])
          filters[key].forEach(size => (request += `&${key}[]=${size}`));
      } else if (filters[key]) request += `&${key}=${filters[key]}`;
    });
    if (!filters.size) filters.size = [];
    if (!filters.heelSize) filters.heelSize = [];
    this.request = `${request}&page=${page}`;
    this.setState({ filters, page });
  }

  splitLocation(location) {
    const filter = location.search.split(/[?=&]/);
    const filters = {};
    for (let i = 1; i < filter.length; i += 2) {
      filters[filter[i]] = filter[i + 1];
    }
    return filters;
  }

  sortBy = () => {
    const type = this.sel.options[this.sel.selectedIndex].value;
    const { products } = this.state;

    const sorted = [].slice.call(products).sort((a, b) => {
      if (a[type] === b[type]) {
        return 0;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return -1;
    });

    this.setState({ products: sorted });
  };
  render() {
    const {
      products,
      categories,
      loading,
      error,
      filters,
      page,
      amount,
      pages,
    } = this.state;
    if (!categories || !products) return null;
    const title =
      filters.categoryId && categories.length
        ? categories.find(el => el.id === parseInt(filters.categoryId)).title
        : 'Все товары';
    if (loading) return <Preloader />;
    if (error) return <div>{`Error: ${error.message}`}</div>;

    return (
      <div style={{ overflowX: 'auto' }}>
        <Breadcrumbs category="Каталог" url="/Catalog/" title={title} />
        <main
          className="product-catalogue"
          ref={elem => (this.catalogTop = elem)}
        >
          <Sidebar filters={filters} filterSelect={this.filterSelect} />

          <section className="product-catalogue-content">
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{title}</h2>
                <span className="amount">{amount} товара</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select
                  name=""
                  id="sorting"
                  onChange={this.sortBy}
                  ref={elem => (this.sel = elem)}
                >
                  <option value="price">по цене</option>
                  <option value="title">по названию</option>
                </select>
              </div>
            </section>

            <section className="product-catalogue__item-list">
              {products.map((item, i) => (
                <ItemCard {...item} products={this.state.products} key={i} />
              ))}
            </section>

            {pages === 1 ? null : (
              <Pagination
                selectedPage={page}
                pages={pages}
                pageSelect={this.pageSelect}
              />
            )}
          </section>
        </main>

        <OverlookedSlider />
      </div>
    );
  }
}

export default Catalog;
