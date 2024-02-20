// SearchBar.jsx
import React, { useState } from 'react';
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Suche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Suchen</button>
    </div>
  );
}

export default SearchBar;
