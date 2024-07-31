import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";

const UserSearch = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (userData) => {
    setUser(userData);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.user_id}`, { state: { profile: user } });
    } else {
      console.error("User data is not available");
    }
  };
  return (
    <div className="window">
      <SearchBar onSearch={handleSearch} />
      {user ? (
        <ProfileCard 
          key={user.id} 
          name={user.name} 
          email={user.email} 
          bio={user.bio} 
          codesCount={user.codesCount}
          onClick={handleProfileClick} 
        />
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserSearch;