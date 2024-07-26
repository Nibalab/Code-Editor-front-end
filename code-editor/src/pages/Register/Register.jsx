import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // Import the CSS file

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        navigate('/login');
    }

    return (
        <div className="register-container">
            <form onSubmit={submit} className="register-form">
                <h1 className="h3 mb-3 fw-normal register-heading">Please register</h1>

                <input 
                    className="form-control" 
                    placeholder="Name" 
                    required
                    onChange={e => setName(e.target.value)}
                />

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

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;
