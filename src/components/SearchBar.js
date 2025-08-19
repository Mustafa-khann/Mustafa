import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import '../styles/SearchBar.css';

const SearchBar = ({ placeholder = "Search posts, ideas, and projects..." }) => {
  const { search, setSearch } = useData();
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const handleClear = () => {
    setLocalSearch('');
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search"
        />
        {localSearch && (
          <button 
            onClick={handleClear}
            className="search-clear-btn"
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {localSearch && (
        <div className="search-info">
          <span>Press Esc to clear</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 