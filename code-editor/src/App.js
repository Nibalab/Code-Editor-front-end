import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import NavBar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import AdminRoute from "./components/AdminRoute"; 
import AdminPage from "./pages/AdminPage"; 
import UserDetails from "./pages/UserDetails";
import "./App.css";
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const content = response.data;
        setName(content.name);
        setIsAdmin(content.is_admin);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [name, isAdmin]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar name={name} setName={setName} is_admin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home name={name}/>}/>
          <Route path="/login" element={<Login setName={setName}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route 
            path="/editor" 
            element={
              <PrivateRoute name={name}>
                <CodeEditor/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute name={name}>
                <AdminRoute isAdmin={isAdmin}>
                  <AdminPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute name={name}>
                <AdminRoute isAdmin={isAdmin}>
                  <UserDetails />
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
