import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';

export default function Registration() {

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

    const [err, setError] = useState(""); // Error state for username taken message

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/Register', formData)
            .then(response => {
                const username = response.data.username
                console.log('User registered successfully:', response.data);
                localStorage.setItem('username', username);
                window.location.href = '/UserInfo'; // Redirect to dashboard page
            })
            .catch(error => {
                console.error('Error registering user:', error);
                setError(error);
            });
    };

    return (

        <>
            <Navbar />
            <div className="main-login-container">
                <div className="login-inner-container">
                    <div className='login-heading' >
                        Sign Up Here!
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className='info-label' >Username:</label>
                        <input type="text" name="username" className="form-input" value={formData.username} onChange={handleInputChange} required />
                        <br />
                        <label className='info-label'>Password:</label>
                        <input type="password" name="password" className="form-input" value={formData.password} onChange={handleInputChange} required />
                        <br />
                        <button type="submit " className="submit">Sign Up</button>
                        {err && 
                        <>
                            <div className="error-text">Username Taken</div>
                            
                        </>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}
