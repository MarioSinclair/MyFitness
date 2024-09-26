import React , { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import axios from "axios";

export default function Goals() {

    const [username, setusername] = useState('');

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setusername(usernameFromStorage);
        } else {
            console.log("No username found in local storage");
        }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/Goals', {...formData, username})
        .then(response => {
            console.log('Goals set successfully:', response.data);
            window.location.href = '/Dashboard';
        })
        .catch (error => {
            console.error('Error fetching data:', error);
        }) 
    };

    const [formData, setFormData] = useState({
        calorieGoal: '',
        proteinGoal: '',
        carbGoal: '',
        fatGoal: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <Navbar />
            <div className="main-info-container">
                <div className="inner-info-container">
                <h1 className="info-heading" >Daily Goals</h1>
                <p>Here you can set your daily nutrition and caloric goals.</p>
                    <form onSubmit={handleSubmit}>
                        <label className="info-label">Calorie Goal</label>
                        <input
                            type="text"
                            name="calorieGoal"
                            className="info-form-input"
                            value={formData.calorieGoal}
                            onChange={handleInputChange}
                            placeholder='Enter the calorie goal...'
                            required
                        />
                        <label className="info-label">Protein Goal</label>
                        <input
                            type="text"
                            name="proteinGoal"
                            className="info-form-input"
                            value={formData.proteinGoal}
                            onChange={handleInputChange}
                            placeholder='Enter the protein goal...'
                            required
                        />
                        <label className="info-label">Fat Goal</label>
                        <input
                            type="text"
                            name="fatGoal"
                            className="info-form-input"
                            value={formData.fatGoal}
                            onChange={handleInputChange}
                            placeholder='Enter the fat goal...'
                            required
                        />
                        <label className="info-label">Carbohydrate Goal</label>
                        <input
                            type="text"
                            name="carbGoal"
                            className="info-form-input"
                            value={formData.carbGoal}
                            onChange={handleInputChange}
                            placeholder='Enter the carbohydrate goal...'
                            required
                        />
                    <button type="submit" className="submit">Create my goals</button>
                    </form>
                    
                </div>
            </div>
            
        </>
    )

}