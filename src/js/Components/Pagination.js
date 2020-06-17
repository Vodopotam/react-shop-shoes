import React from 'react';

const Pagination = ({ selectedPage, pages, pageSelect }) => {
  const listPages = [];

  for (let i = 1; i <= pages; i++) {
    listPages.push(i);
  }

  return (
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        <div className={`angle-back ${selectedPage === 1 ? 'hidden' : ''} `}>
          <a
            onClick={() =>
              pageSelect(selectedPage === 1 ? selectedPage : selectedPage - 1)
            }
          />
        </div>
        <ul>
          {listPages.map(page => (
            <li
              key={page}
              className={`${selectedPage === page ? 'active' : ''}`}
            >
              <a onClick={() => pageSelect(page)}>{page}</a>
            </li>
          ))}
        </ul>
        <div
          className={`angle-forward ${
            selectedPage === listPages.length ? 'hidden' : ''
          } `}
        >
          <a
            onClick={() =>
              pageSelect(
                selectedPage === listPages.length
                  ? selectedPage
                  : selectedPage + 1
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
