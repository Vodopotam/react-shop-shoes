//Видимость блока корзина и профиля в шапке
export function headerHiddenPanelProfileVisibility() {
  document
    .querySelector('.hidden-panel__basket')
    .classList.remove('hidden-panel__basket_visible');
  document
    .querySelector('.hidden-panel__profile')
    .classList.add('hidden-panel__profile_visible');
  if (document.querySelector('.header-main__pic_basket_menu_is-active')) {
    document
      .querySelector('.header-main__pic_basket_menu_is-active')
      .classList.toggle('header-main__pic_basket_menu_is-active');
    document
      .querySelector('.header-main__pic_profile_menu')
      .classList.toggle('header-main__pic_profile_menu_is-active');
  } else {
    document
      .querySelector('.header-main__hidden-panel')
      .classList.toggle('header-main__hidden-panel_visible');
    document
      .querySelector('.header-main__pic_profile_menu')
      .classList.toggle('header-main__pic_profile_menu_is-active');
  }
}

export function headerHiddenPanelBasketVisibility() {
  document
    .querySelector('.hidden-panel__profile')
    .classList.remove('hidden-panel__profile_visible');
  document
    .querySelector('.hidden-panel__basket')
    .classList.add('hidden-panel__basket_visible');
  if (document.querySelector('.header-main__pic_profile_menu_is-active')) {
    document
      .querySelector('.header-main__pic_basket_menu')
      .classList.toggle('header-main__pic_basket_menu_is-active');
    document
      .querySelector('.header-main__pic_profile_menu_is-active')
      .classList.toggle('header-main__pic_profile_menu_is-active');
  } else {
    document
      .querySelector('.header-main__hidden-panel')
      .classList.toggle('header-main__hidden-panel_visible');
    document
      .querySelector('.header-main__pic_basket_menu')
      .classList.toggle('header-main__pic_basket_menu_is-active');
  }
}

//Функция видимости меню поиска в шапке
export function headerMainSearchVisibility() {
  document
    .querySelector('.header-main__search')
    .classList.toggle('header-main__search_active');
  document
    .querySelector('.header-main__pic_search')
    .classList.toggle('header-main__pic_search_is-hidden');
}

export function mainSubmenuVisibility(event) {
  event.preventDefault();
  if (event.currentTarget.classList.contains('main-menu__item_active')) {
    document
      .querySelector('.dropped-menu')
      .classList.remove('dropped-menu_visible');
    event.currentTarget.classList.remove('main-menu__item_active');
  } else {
    if (document.querySelector('.main-menu__item_active')) {
      document
        .querySelector('.main-menu__item_active')
        .classList.toggle('main-menu__item_active');
    }
    document
      .querySelector('.dropped-menu')
      .classList.add('dropped-menu_visible');
    event.currentTarget.classList.toggle('main-menu__item_active');
  }
}

export function getFavourite(id) {
  let favourite = localStorage.getItem('favourite');
  if (!favourite) {
    localStorage.setItem('favourite', '[]');
    favourite = localStorage.getItem('favourite');
  }
  const parsed = JSON.parse(favourite);
  return id ? parsed.findIndex(i => i.id === id) + 1 : parsed;
  console.log(parsed);
}

export function setFavourite(id, products) {
  const parsed = getFavourite();
  if (!parsed) {
    localStorage.setItem('favourite', '[]');
    setFavourite(id, products);
    return;
  }
  const chosen = parsed.findIndex(i => i.id === Number(id));
  chosen !== -1
    ? parsed.splice(chosen, 1)
    : parsed.push(products.find(i => i.id === id));
  localStorage.setItem('favourite', JSON.stringify(parsed));
}

export function getLooked(id) {
  let looked = sessionStorage.getItem('looked');
  if (!looked) {
    sessionStorage.setItem('looked', '[]');
    looked = sessionStorage.getItem('looked');
  }
  const parsed = JSON.parse(looked);
  return id ? parsed.findIndex(i => i.id === id) + 1 : parsed;
}

export function setLooked(id, item) {
  const storage = getLooked();

  if (!storage) {
    sessionStorage.setItem('looked', '[]');
    setLooked(id, item);
    return;
  }

  if (storage.length === 10) {
    storage.pop();
  }

  const duplicate = storage.findIndex(i => i.id === id);
  duplicate !== -1 ? null : storage.unshift(item);
  sessionStorage.setItem('looked', JSON.stringify(storage));
}

export function getData(url, type = 'GET', body) {
  const params = {};
  if (type === 'POST') {
    params.body = JSON.stringify(body);
    params.headers = new Headers({ 'Content-Type': 'application/json' });
    params.method = 'POST';
  }

  return fetch(`https://api-neto.herokuapp.com/bosa-noga/${url}`, params)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .catch(err => console.log(err));
}

export function getItem(id) {
  return getData(`products/${id}`);
}

export function getCart() {
  getData(`cart/${localStorage.getItem('cartId')}`);
}

export function changeCart(id, size, amount) {
  const json = { id, size, amount };

  let cart = localStorage.getItem('cartId');
  if (cart === null) cart = '';
  return getData(`cart/${cart}`, 'POST', json)
    .then(res => {
      localStorage.setItem('cartId', res.data.id);
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
}

export function removeItem(item) {
  if (this.state.cart.length === 1) {
    changeCart(item.id, item.size, 0).then(localStorage.removeItem('cartId'));
    this.setState({ cart: [] });
  } else {
    changeCart(item.id, item.size, 0).then(res =>
      this.getCartItems(res.data.products)
    );
  }
}
