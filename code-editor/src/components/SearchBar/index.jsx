import axios from "axios";
import { React, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);
      const type = isEmail ? "email" : "username";

      const response = await axios.get("http://localhost:8000/api/profile", {
       
        params: {
          query,
          type,
        },
        withCredentials: true
      });

      console.log('API Response:', response.data); // Debugging line

      setError("");
      onSearch(response.data);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setError("User not found");
      onSearch(null);
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