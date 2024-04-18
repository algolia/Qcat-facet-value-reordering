import React from 'react';

export const Header = ({ setEnableQcat, enableQcat }) => {
  return (
    <header className="header">
      <div className="header-in">
        <div className="header-demo-title">
          <h1 className="header-title">
            <a href="/">
              Query Categorisation Dynamic Facet values re-ordering
            </a>
          </h1>
          <p className="header-subtitle">
            <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </div>
        <div className="queryCat-btn">
          <span>
            {enableQcat ? 'Disable' : 'Enable'} Qcat Facet values reordering
          </span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setEnableQcat((prev) => !prev)}
            />
            <div></div>
          </label>
        </div>
      </div>
    </header>
  );
};
