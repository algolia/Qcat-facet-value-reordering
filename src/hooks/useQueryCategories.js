import { useInstantSearch } from 'react-instantsearch';

/**
 * Retrieves query categorization categories from Algolia search results.
 *
 * @returns {Array} Categories array or an empty array if no categories found.
 */
export const useQueryCategories = () => {
  const { results } = useInstantSearch();

  return (
    results._rawResults[0].extensions?.queryCategorization?.categories ?? []
  );
}
