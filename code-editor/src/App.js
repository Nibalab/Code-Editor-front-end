import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import NavBar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import AdminRoute from "./components/AdminRoute"; // Import the new AdminRoute component
import AdminPage from "./pages/AdminPage"; // Your admin page component
import "./App.css"
import UserSearch from "./pages/user-browser-page";
function App() {
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const content = await response.json();

      setName(content.name);
      setIsAdmin(content.is_admin);
    })();
  }, [name, isAdmin]);

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar name={name} setName={setName} is_admin={isAdmin} />
      <Routes>
          <Route path="/" element={<Home name={name}/>}/>
          <Route path="/login" element={<Login setName={setName}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/search" element={<UserSearch/>}/>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
