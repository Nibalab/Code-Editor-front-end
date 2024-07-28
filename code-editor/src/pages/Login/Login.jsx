import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../userSlice';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    const content = await response.json();
    
    dispatch(setUser({ name: content.name, isAdmin: content.is_admin }));
    navigate('/');
  }

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-form">
        <h1 className="h3 mb-3 fw-normal login-heading">Please sign in</h1>
        <input 
          type="email" 
          className="form-control" 
          placeholder="Email address" 
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          className="form-control" 
          placeholder="Password" 
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
