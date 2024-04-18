import React from 'react';
import { Highlight } from 'react-instantsearch';

export const Hit = ({ hit }) => (
  <article className="hit">
    <div className="hit-image-wrapper">
      <img className="hit-image" src={hit.image} alt={hit.name} />
    </div>
    <div className="hit-infos">
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </div>
  </article>
);
