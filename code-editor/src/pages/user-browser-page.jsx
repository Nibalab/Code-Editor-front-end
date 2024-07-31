import React, { useState } from "react";
import ProfileCard from "../components/Profile-Card/profile_card";
import SearchBar from "../components/SearchBar/index";

const UserSearch = () => {
    const [users, setUsers] = useState([]);

    const handleSearch = (user) => {
        setUsers(user ? [user] : []); 
    };

    return (
        <div className="window">
            <SearchBar onSearch={handleSearch} /> 
            {users.length > 0 ? (
                users.map(user => (
                    <ProfileCard key={user.id} name={user.name} bio={user.email} />
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserSearch;