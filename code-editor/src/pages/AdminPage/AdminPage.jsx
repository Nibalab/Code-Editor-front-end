import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', is_admin: false });
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
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
      const createdUser = response.data.user || response.data;
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected for upload');
      return;
    }

    Papa.parse(selectedFile, {
      header: true,
      complete: async (results) => {
        const users = results.data;

        // Validate data
        const validUsers = users.filter(user => user.email && user.name && user.password);

        // Send valid users to backend
        for (const user of validUsers) {
          try {
            const response = await axios.post('http://localhost:8000/api/users', user, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            });

            if (response.status === 201) {
              const createdUser = response.data.user || response.data;
              setUsers(prevUsers => [...prevUsers, createdUser]);
            } else {
              console.error('Error creating user:', response.data);
            }
          } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error);
          }
        }
      },
    });
  };

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

      <h2>Bulk Import Users</h2>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>

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
