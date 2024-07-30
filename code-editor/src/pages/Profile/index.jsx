import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          withCredentials: true, // Ensure credentials are included
        });

        if (response.status === 200) {
          if (response.data.profile) {
            setProfile(response.data.profile);
            setBio(response.data.profile.bio || '');
          } else {
            setProfile(null); // No profile exists
            setBio(''); // Clear bio if no profile
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/profile', 
        { bio }, // Include the bio in the request body
        {
          withCredentials: true, // Ensure credentials are included
        }
      );
      console.log('Profile save response:', response.data);
      setProfile(response.data.profile); // Update profile state
    } catch (error) {
      console.error('Error saving profile data:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Profile</h1>
      {profile ? (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
          {/* No form is needed if profile already exists */}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Create Bio:
            <textarea value={bio} onChange={handleBioChange} />
          </label>
          <button type="submit">Create Profile</button>
        </form>
      )}
    </div>
  );
};

export default Profile;