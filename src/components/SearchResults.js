import React from 'react';
import Category from './Category';

const SearchResults = ({ searchQuery, filterItems }) => {
  const results = filterItems([]); // No items passed, just filter by query

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {results.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <Category items={results} />
      )}
    </div>
  );
};

export default SearchResults;
