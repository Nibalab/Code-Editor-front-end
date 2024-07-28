import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import NavBar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './userSlice';
import Register from "../src/pages/Register/Register";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import AdminRoute from "./components/AdminRoute"; 
import AdminPage from "../src/pages/AdminPage/AdminPage"; 
import UserDetails from "../src/pages/UserDetails/UserDetails";
import "./App.css";
import Footer from "../src/components/Footer/Footer";
import Projects from "./pages/Projects/Projects";
import CodeDetail from "./pages/Projects/CodeDetail";

function App() {
  const dispatch = useDispatch();
  const { name, isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const content = await response.json();

      dispatch(setUser({ name: content.name, isAdmin: content.is_admin }));
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar name={name} />
      <Routes>
          <Route path="/" element={<Home name={name}/>}/>
          <Route path="/login" element={<Login setName={dispatch(setUser)}/>}/>
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
