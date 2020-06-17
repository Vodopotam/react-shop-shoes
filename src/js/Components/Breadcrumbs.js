import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ url, category, type, title, urlType }) => (
  <div className="site-path">
    <ul className="site-path__items">
      <li className="site-path__item">
        <Link to="/">Главная</Link>
      </li>
      {category ? (
        <li className="site-path__item">
          <Link to={url}>{category}</Link>
        </li>
      ) : null}
      {type ? (
        <li className="site-path__item">
          <Link to={urlType}>{type}</Link>
        </li>
      ) : null}
      <li className="site-path__item">
        <a href="">{title}</a>
      </li>
    </ul>
  </div>
);

export default Breadcrumbs;
