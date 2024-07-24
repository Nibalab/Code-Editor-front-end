import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import NavBar from "./components/Navbar";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import "./App.css"

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const content = await response.json();

      setName(content.name);
    })();
  }, [name]); 

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar name={name} setName={setName}/>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
