import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  SearchBox,
  Hits,
  Pagination,
  DynamicWidgets,
} from 'react-instantsearch';

import './App.css';

// internal components
import { Header } from './components/Header';
import { Hit } from './components/Hit';
import { CustomHierarchicalMenu } from './components/CustomHierarchicalMenu';
import { CustomRefinementList } from './components/CustomRefinementList';

const searchClient = algoliasearch(
  'latency',
  'af044fb0788d6bb15f807e4420592bc5'
);
const indexName = 'instant_search_facet_values_reordering_Qcat';

export function App() {
  const [enableQcat, setEnableQcat] = useState(false);
  return (
    <div>
      <Header setEnableQcat={setEnableQcat} enableQcat={enableQcat} />
      <div className="container">
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Configure hitsPerPage={8} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <DynamicWidgets>
                <CustomHierarchicalMenu
                  enableQcat={enableQcat}
                  attributes={[
                    'hierarchicalCategories.lvl0',
                    'hierarchicalCategories.lvl1',
                    'hierarchicalCategories.lvl2',
                    'hierarchicalCategories.lvl3',
                    'hierarchicalCategories.lvl4',
                  ]}
                  openByDefault={true}
                  limit={15}
                  showMore={true}
                  header={'Categories'}
                />
                <CustomRefinementList
                  enableQcat={enableQcat}
                  attribute="brand"
                  openByDefault={true}
                  limit={10}
                  showMore={true}
                  header={'Brand'}
                />
              </DynamicWidgets>
            </div>
            <div className="search-panel__results">
              <SearchBox placeholder="Search" />
              <p>TEST</p>
              <Hits hitComponent={Hit} />
              <Pagination className="pagination" />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
