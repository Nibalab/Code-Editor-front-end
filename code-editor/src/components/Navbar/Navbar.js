import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        props.setName('');
    }

    let menu;

    if (props.name === '') {
        menu = (
            <div className="navbar-actions">
                <Link to="/login" className="btn btn-login">Login</Link>
                <Link to="/register" className="btn btn-signup">Signup</Link>
            </div>
        );
    } else {
        menu = (
            <div className="navbar-actions">
                <Link to="/profile" className="btn btn-profile">Profile</Link>
                <Link to="/" className="btn btn-logout" onClick={logout}>Logout</Link>
                {props.is_admin && (
                    <Link to="/admin" className="btn btn-admin">Admin</Link>
                )}
            </div>
        );
    }

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">CodeEditor</Link>
                <div className="navbar-center">
                    <div className="navbar-links">
                        <Link to="/">Home</Link>
                        <Link to="/search">Search</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/chat">Chat</Link>
                    </div>
                </div>
                {menu}
            </div>
        </nav>
    );
};

export default Navbar;
