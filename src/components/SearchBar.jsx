import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar-wrapper">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title or description
      </label>
      <div className="search-input-container">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <input
          id="task-search-input"
          type="text"
          className="search-input"
          placeholder="Search tasks by title or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search query"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
