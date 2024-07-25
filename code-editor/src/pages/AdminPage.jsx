import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', is_admin: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log('Fetched users:', response.data.users); // Debugging line
        setUsers(response.data.users || []); // Ensure users is an array
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]); // Set users to an empty array on error
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
    }
  };

  const handleToggleAdmin = async (id) => {
    const user = users.find(user => user.id === id);
    const updatedData = { is_admin: !user.is_admin };
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setUsers(users.map(user => (user.id === id ? { ...user, is_admin: !user.is_admin } : user)));
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users', newUser, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Created user:', response.data); // Debugging line
      
      // Check if the response contains the user data in the expected format
      const createdUser = response.data.user || response.data;
      
      // Ensure that the user has the necessary fields
      if (createdUser && createdUser.id && createdUser.name) {
        setUsers([...users, createdUser]);
        setNewUser({ name: '', email: '', password: '', is_admin: false });
      } else {
        console.error('Invalid user data:', createdUser);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  
  // Ensure that filtering handles cases where user.name might be undefined
  const filteredUsers = Array.isArray(users)
    ? users.filter(user => user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];
  
  return (
    <div>
      <h1>Users List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <label>
        Admin:
        <input
          type="checkbox"
          checked={newUser.is_admin}
          onChange={(e) => setNewUser({ ...newUser, is_admin: e.target.checked })}
        />
      </label>
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.is_admin ? 'Admin' : 'User'}
            <button onClick={() => navigate(`/users/${user.id}`)}>Details</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <button onClick={() => handleToggleAdmin(user.id)}>
              {user.is_admin ? 'Make User' : 'Make Admin'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
