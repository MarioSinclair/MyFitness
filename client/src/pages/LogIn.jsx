import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [err, setErrors] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // First, check if the user exists and credentials match
            const response = await axios.get(`http://localhost:8080/Register/${formData.username}`);
            
            if (formData.username === response.data.username && formData.password === response.data.password) {
                const username = response.data.username;
                console.log('User logged in successfully:', response.data);
                localStorage.setItem('username', username);
                window.location.href = '/Dashboard';
            } else {
                console.log('Invalid credentials');
                // Redirect to registration page or show error message
                setErrors("Incorrect Password")
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrors("Username not found");
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-login-container">
                <div className="login-inner-container">
                    <div className='login-heading' >
                        Log In Here!
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className='info-label'>Username:</label>
                        <input type="text" name="username" className="form-input" value={formData.username} onChange={handleInputChange} required />
                        <br />
                        <label className='info-label'>Password:</label>
                        <input type="password" name="password" className="form-input" value={formData.password} onChange={handleInputChange} required />
                        <br />
                        <button type="submit" className="submit">Log In</button>
                        {err && 
                        <>
                            <div className="error-text">{err}</div>
                            
                        </>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}
