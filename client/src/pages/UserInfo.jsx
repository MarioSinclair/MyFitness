import Navbar from './Navbar.jsx';
import React, { useState, useEffect } from 'react';
import "./UserInfo.css";
import axios from 'axios';

export default function UserInfo() {

    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setUsername(usernameFromStorage);
        }
    }, []);

    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        bmi: '',
        heightFeet: '',
        heightInches: '',
        heightCm: '',
        isImperial: true 
    });

    const handleUnitToggle = () => {
        setFormData(prevState => ({
            ...prevState,
            isImperial: !prevState.isImperial,
            weight: '',
            heightFeet: '',
            heightInches: '',
            heightCm: ''
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        handleBMICalculation();
    };

    const handleBMICalculation = () => {
        let bmi;
        let height;
        if (formData.isImperial) {
            height = (parseFloat(formData.heightFeet) || 0) * 12 + (parseFloat(formData.heightInches) || 0);
            const weightInPounds = parseFloat(formData.weight) || 0;
            bmi = (weightInPounds / (height * height)) * 703;
        } else {
            height = (parseFloat(formData.heightCm) || 0) / 100;
            const weightInKilograms = parseFloat(formData.weight) || 0;
            bmi = weightInKilograms / (height * height);
        }

        setFormData(prevState => ({
            ...prevState,
            height: height
        }));
        return bmi.toFixed(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const calculatedBMI = handleBMICalculation();

        const updatedFormData = {
            ...formData,
            bmi: calculatedBMI
        };

        axios.post("http://localhost:8080/UserInfo", { ...updatedFormData, username})
            .then(response => {
                console.log('Info successfully updated:', response.data);
                window.location.href = '/Goals';
            })
            .catch(error => {
                console.error('Error updating user info:', error);
                setError('Error updating user info');
            });
        setError('Invalid BMI value');
    };

    return (
        <>
            <Navbar />
            <div className="main-info-container">
                <div className="inner-info-container">
                    <div className='info-heading'>Personal Information</div>
                    <form onSubmit={handleSubmit}>
                        <div className="toggle-buttons">
                            <button
                                type="button"
                                className={formData.isImperial ? "toggled" : "untoggled"}
                                onClick={formData.isImperial ? handleUnitToggle : null }
                                onChange={handleInputChange}
                            >
                                Metric
                            </button>
                            <button
                                type="button"
                                className={formData.isImperial ? "untoggled" : "toggled"}
                                onClick={formData.isImperial ? null : handleUnitToggle }
                                onChange={handleInputChange}
                            >
                                Imperial
                            </button>
                        </div>
                        <label className='info-label'>Age:</label>
                        <input
                            type="text"
                            name="age"
                            className="info-form-input"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder='Enter your age...'
                            required
                        />
                        <label className='info-label'>{formData.isImperial ? 'Weight in lbs:' : 'Weight in kg:'}</label>
                        <input
                            type="text"
                            name="weight"
                            className="info-form-input"
                            value={formData.weight}
                            onChange={handleInputChange}
                            placeholder={formData.isImperial ? 'Enter your weight...' : 'Enter your weight...'}
                            required
                        />
                        <label className='info-label'>{formData.isImperial ? 'Height:' : 'Height in cm:'}</label>
                        {formData.isImperial ? (
                            <div className="imperial">
                                <div className="height">
                                    <input
                                        type="text"
                                        name="heightFeet"
                                        className="info-form-input"
                                        value={formData.heightFeet}
                                        onChange={handleInputChange}
                                        placeholder='Feet'
                                        required
                                    />
                                </div>
                                <div className="height">
                                    <input
                                        type="text"
                                        name="heightInches"
                                        className="info-form-input"
                                        value={formData.heightInches}
                                        onChange={handleInputChange}
                                        placeholder='Inches'
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                name="heightCm"
                                className="info-form-input"
                                value={formData.heightCm}
                                onChange={handleInputChange}
                                placeholder='Enter your height...'
                                required
                            />
                        )}
                        <label className='info-label'>Your BMI is: {formData.bmi}</label>
                        <br />
                        <button type="submit" className="submit">Next</button>
                    </form>
                </div>
            </div>
        </>
    );
}
