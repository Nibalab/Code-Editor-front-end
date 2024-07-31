import axios from "axios";
import { React, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);

      const type = isEmail ? "email" : "username";

      const response = await axios.get("http://localhost:8000/api/search", {
        params: {
          query,
          type,
        },
      });

      setError("");
      onSearch(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.response.data);
      setError("User not found");
      onSearch([]);
    }
  };

  return (
    <div className="window">
      <input
        type="text"
        placeholder="Enter Username or Email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
