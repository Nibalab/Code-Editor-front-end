import React, { useState, useEffect } from "react";
import ProfileCard from "../components/Profile-Card/profile_card";
import axios from "axios";

const UserSearch = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/search'); 
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="window">
            {users.length > 0 ? (
                users.map(user => (
                    <ProfileCard name={user.name} bio={user.email} />
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserSearch;