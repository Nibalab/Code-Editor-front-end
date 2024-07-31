import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import NavBar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import AdminRoute from "./components/AdminRoute"; 
import AdminPage from "./pages/AdminPage/AdminPage"; 
import UserDetails from "./pages/UserDetails/UserDetails";
import Footer from "./components/Footer/Footer";
import Projects from "./pages/Projects/Projects";
import CodeDetail from "./pages/Projects/CodeDetail";
import ChatPage from "./pages/ChatPage/ChatPage";
import "./App.css";
import Profile from "./pages/Profile";
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
            path="/profile" 
            element={
              
                <Profile/>}
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
            path="/projects"
            element={
              <PrivateRoute name={name}>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/code/:id"
            element={
              <PrivateRoute name={name}>
                <CodeDetail />
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
          <Route
            path="/chat"
            element={
              <PrivateRoute name={name}>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
