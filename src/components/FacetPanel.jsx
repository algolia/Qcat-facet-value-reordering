import { useState } from 'react';

// Icons
import { Plus, Minus } from 'lucide-react';

export const FacetPanel = ({ children, header, openByDefault }) => {
  const [isListOpen, setIsListOpen] = useState(openByDefault);
  return (
    <div className="facetPanel">
      <div
        className="facetPanel-header-group"
        onClick={() => {
          setIsListOpen(!isListOpen);
        }}
      >
        <h2 className="facetPanel-header-text">{header}</h2>
        <div
          className={`facetPanel-icon-container ${
            isListOpen ? 'icon-plus' : 'icon-minus'
          }`}
        >
          {isListOpen ? <Plus size={24} /> : <Minus size={24} />}
        </div>
      </div>
      <div
        className={`facetPanel-content-area ${
          isListOpen ? 'visible' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
