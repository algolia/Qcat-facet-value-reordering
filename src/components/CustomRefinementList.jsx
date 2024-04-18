import { useState, useEffect } from 'react';
import { useRefinementList } from 'react-instantsearch';
import { FacetPanel } from './FacetPanel';
import useFacetValueReordering from '../hooks/useFacetValueReordering';

export const RefinementItem = ({ item, refine }) => {
  const handleCheckbox = (e) => {
    refine(e.target.value);
  };

  return (
    <li className="refinement-list-item">
      <label className="refinement-list-label">
        <div>
          <input
            className="refinement-list-checkbox"
            type="checkbox"
            checked={item.isRefined}
            onChange={handleCheckbox}
            value={item.label}
          />
          <span
            className={`refinement-list-label-text ${
              item.isRefined
                ? 'refinement-list-label-refined'
                : 'refinement-list-label-not-refined'
            }`}
            dangerouslySetInnerHTML={{ __html: item.highlighted }}
            style={{ textTransform: 'capitalize' }}
          ></span>
        </div>
        <span
          className={`refinement-list-count ${
            item.isRefined
              ? 'refinement-list-count-refined'
              : 'refinement-list-count-not-refined'
          }`}
        >
          {item.count}
        </span>
      </label>
    </li>
  );
};

export const CustomRefinementList = ({
  attribute,
  searchable,
  searchablePlaceholder,
  limit,
  showMoreLimit,
  showMore,
  header,
  openByDefault,
  enableQcat,
}) => {
  const [hasRefinementsToShow, setHasRefinementsToShow] = useState(false);
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    toggleShowMore,
    isShowingMore,
    hasExhaustiveItems,
    isFromSearch,
  } = useRefinementList({
    attribute: attribute,
    searchable: searchable,
    limit: limit,
    showMoreLimit: showMoreLimit,
    searchablePlaceholder: searchablePlaceholder,
    showMore: showMore,
  });

  const sortedItems = useFacetValueReordering(items, enableQcat);

  useEffect(() => {
    setHasRefinementsToShow(items.length > 0 || isFromSearch);
  }, [items, isFromSearch]);

  return (
    <div className={`${hasRefinementsToShow ? '' : 'hidden'}`}>
      <FacetPanel header={header} openByDefault={openByDefault}>
        {!hasExhaustiveItems && searchable && (
          <form>
            <input
              className="search-input"
              onChange={(e) => searchForItems(e.target.value)}
              autoComplete="off"
              placeholder={searchablePlaceholder}
            ></input>
          </form>
        )}
        <ul>
          {sortedItems.length > 0 ? (
            sortedItems.map((item, index) => (
              <RefinementItem
                key={`${attribute}-${index}`}
                item={item}
                refine={refine}
              />
            ))
          ) : (
            <p className="no-facets-text">No available facets...</p>
          )}
        </ul>
        {canToggleShowMore && (
          <button onClick={toggleShowMore} className="show-more-button">
            {isShowingMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </FacetPanel>
    </div>
  );
};
