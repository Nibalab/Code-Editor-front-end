import React, { useState } from 'react';
import './UserSearch.css';

const UserSearch = ({ searchUsers, searchResults, selectUser }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers(query);
  };

  return (
    <div className="user-search-container">
      <form onSubmit={handleSearch} className="user-search-form">
        <input
          type="text"
          placeholder="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="user-search-input"
        />
        <button type="submit" className="user-search-button">Search</button>
      </form>
      <ul className="user-search-results">
        {searchResults.map((user) => (
          <li key={user.id} onClick={() => selectUser(user)}>
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
