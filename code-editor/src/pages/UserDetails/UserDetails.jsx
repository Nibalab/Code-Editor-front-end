import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        // Check the structure of the response
        console.log('User data:', response.data); // Debugging line
        setUser(response.data.user || response.data); // Adjust based on API response
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Status: {user.is_admin ? 'Admin' : 'User'}</p>
    </div>
  );
};

export default UserDetails;
