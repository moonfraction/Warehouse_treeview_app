import React, { useState, useRef } from 'react';
import '../styles/navbar.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const toggleSearch = () => {
    if (showSearch) {
      // Hide the search bar and reset the search query
      setSearchQuery('');
      onSearch(''); // Clear the matches in the sidebar
    }
    setShowSearch(!showSearch);
    
    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 0);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Godown</div>
      <div className={`navbar-search-container ${showSearch ? 'expanded' : ''}`}>
        {showSearch && (
          <input
            type="text"
            className={`navbar-search ${showSearch ? 'show' : ''}`}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            ref={searchInputRef}
          />
        )}
        <FaSearch className="search-icon" onClick={toggleSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
