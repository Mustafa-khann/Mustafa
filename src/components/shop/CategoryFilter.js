import React from 'react';
import { categoryLabels } from '../../data/products';

const CategoryFilter = ({ categories, activeCategory, onChange }) => (
  <nav className="shop-category-filter" aria-label="Product categories">
    {categories.map((category) => (
      <button
        type="button"
        key={category}
        className={activeCategory === category ? 'is-active' : ''}
        aria-pressed={activeCategory === category}
        onClick={() => onChange(category)}
      >
        {categoryLabels[category]}
      </button>
    ))}
  </nav>
);

export default CategoryFilter;

