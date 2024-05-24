import { useMemo } from 'react';
import { useQueryCategories } from './useQueryCategories';

/**
 * Custom hook for reordering facet values based on query categories.
 *
 * @param {Array} items - The items to be sorted.
 * @param {boolean} enableQcat - Flag to enable/disable the reordering based on query categories.
 * @returns {Array} The sorted array of items.
 */
const useFacetValueReordering = (items, enableQcat) => {
  // Fetch the query categories using a custom hook.
  const queryCategories = useQueryCategories();
  console.log('Query categories:', queryCategories);

  /**
   * Prepares an array of category values with their corresponding ranks.
   * The rank is determined by the depth of the category in the hierarchy,
   * inferred from the number of '>' characters in the category path.
   *
   * @returns {Array} An array of objects, each containing a category value and its rank.
   */
  const prepareRankedCategories = () => {
    if (!queryCategories.length) {
      return [];
    }

    const rankedCategories = queryCategories.flatMap(({ hierarchyPath }) =>
      hierarchyPath.map(({ facetValue }) => ({
        value: facetValue.toLowerCase(), // Convert the category value to lowercase for case-insensitive comparison.
        rank: facetValue.split('>').length, // Determine the rank based on the depth of hierarchy.
      }))
    );

    return rankedCategories.sort((a, b) => b.rank - a.rank); // Sort categories by rank in descending order so deeper categories come first.
  };

  /**
   * Recursively sorts the provided items based on their match with ranked categories.
   *
   * @param {Array} itemsToSort - The items to sort.
   * @param {Array} rankedCategories - The ranked categories used for sorting.
   * @param {number} depth - Current depth of recursion, mainly for debugging purposes.
   * @returns {Array} The sorted array of items.
   */
  const sortItemsRecursively = (itemsToSort, rankedCategories, depth) => {
    // Skip sorting if disabled or if there are no ranked categories.
    if (!enableQcat || rankedCategories.length === 0) {
      return itemsToSort;
    }

    // Sort the items based on their match with ranked categories.
    const sorted = [...itemsToSort].sort((a, b) => {
      // Helper function to find the index of the first matching category for an item.
      const findCategoryRank = (item) =>
        rankedCategories.findIndex(({ value }) =>
          item.value.toLowerCase().includes(value)
        );

      // Determine the rank of both items for comparison.
      const rankA = findCategoryRank(a);
      const rankB = findCategoryRank(b);

      // Prioritize items with a higher-ranked match.
      if (rankA !== -1 && (rankB === -1 || rankA < rankB)) {
        return -1;
      } else if (rankB !== -1 && (rankA === -1 || rankB < rankA)) {
        return 1;
      }
      return 0;
    });

    // Apply the sorting logic recursively to nested items.
    sorted.forEach((item) => {
      if (item.data) {
        item.data = sortItemsRecursively(
          item.data,
          rankedCategories,
          depth + 1
        );
      }
    });
    return sorted;
  };

  // Use `useMemo` to memoize the result of the sorting operation,
  // to avoid unnecessary recalculations on re-renders.
  return useMemo(() => {
    const rankedCategories = prepareRankedCategories();
    // Initiate recursive sorting with the top-level items and ranked categories.
    return sortItemsRecursively(items, rankedCategories, 0);
  }, [items, queryCategories, enableQcat]); // Dependencies array to trigger re-calculation when these values change.
};

export default useFacetValueReordering;
