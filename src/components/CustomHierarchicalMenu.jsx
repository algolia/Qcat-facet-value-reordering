// Algolia components
import { useHierarchicalMenu } from 'react-instantsearch';

// Internal Components
import { FacetPanel } from './FacetPanel';

// Custom Hooks
import useFacetValueReordering from '../hooks/useFacetValueReordering';

export const CustomHierarchicalMenu = ({
  header,
  openByDefault,
  attributes,
  limit,
  showMore,
  enableQcat,
}) => {
  const {
    items,
    refine,
    canToggleShowMore,
    toggleShowMore,
    isShowingMore,
    createURL,
  } = useHierarchicalMenu({
    attributes: attributes,
    limit: limit,
  });
  const sortedItems = useFacetValueReordering(items, enableQcat);

  return (
    <FacetPanel header={header} openByDefault={openByDefault}>
      <>
        <HierarchicalList
          items={sortedItems}
          refine={refine}
          createURL={createURL}
        />
        {showMore && canToggleShowMore && (
          <button
            onClick={toggleShowMore}
            className="ais-RefinementList-showMore customHierarchicalMenu-btn"
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </>
    </FacetPanel>
  );
};

function HierarchicalList({ items, createURL, refine }) {
  return (
    <ul className="hierarchicalList">
      {items.map((item) => {
        return (
          <li key={item.value} className="">
            <a
              href={createURL(item.value)}
              onClick={(event) => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <span
                className={`${
                  item.isRefined
                    ? 'hierarchicalList-refined'
                    : 'hierarchicalList-notRefined'
                } hierarchicalList-label`}
              >
                {item.label}
              </span>
              <span
                className={`hierarchicalList-count ${
                  item.isRefined
                    ? 'hierarchicalList-count-refined'
                    : 'hierarchicalList-count-notRefined'
                } `}
              >
                {item.count}
              </span>
            </a>
            {item.data && (
              <HierarchicalList
                items={item.data}
                refine={refine}
                createURL={createURL}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
