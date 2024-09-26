import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Validation from './NutritionValidation.jsx';
import './Nutrition.css';
import axios from 'axios';
import GetMacros from './GetMacros.jsx';
import { RiDeleteBinLine } from '@remixicon/react';

export default function Nutrition() {

    const [username, setusername] = useState('');

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setusername(usernameFromStorage);
        } else {
            console.log("No username found in local storage");
        }

    }, []);

    const [values, setValues] = useState({
        foodName: '',
        weight: '',
        calories: '',
        protein: '',
        fats: '',
        carbs: '',
    });
    
    const [errors, setErrors] = useState({});
    const [nutritionData, setNutritionData] = useState([]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({...prev, [name]: value }));
        validateForm();
    };

    const validateForm = () => {
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    useEffect(() => {
        // Fetch nutrition data for userId
        const fetchNutritionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/nutrition/${username}`);
                setNutritionData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (username) {
            fetchNutritionData();
        }
    }, [username]);

    const fetchNutritionData = async () => {
        try {
            if (!username) return;

            const response = await axios.get(`http://localhost:8080/nutrition/${username}`);
            setNutritionData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleSubmit = (e) => {
        if (validateForm()) {
            axios.post(`http://localhost:8080/Nutrition`, {...values, username: username})
                .then(res => {
                    console.log('Macro added successfully:', res.data);
                    setNutritionData(prevData => [...prevData, {username: res.data.username, ...values}]);
                    setValues({
                        foodName: '',
                        weight: '',
                        calories: '',
                        protein: '',
                        fats: '',
                        carbs: '',
                        username: username
                    });
                    setErrors({});
                })
                .catch(err => {
                    console.error('Error adding macro:', err);
                });
        } else {
            console.log('Validation errors:', errors);
        }
    };


    useEffect(() => {
        fetchNutritionData();
    },  [setusername]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/Nutrition/${id}`);
            console.log('Macro deleted successfully:', id);
            setNutritionData(prevData => prevData.filter(macro => macro.id !== id));
            
        } catch (error) {
            console.error('Error deleting macro:', error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="main-container-heading">
                    <h1>Track Your Macros</h1>
                </div>
                <div className="form-main-container">
                    <div className="form-container">
                        <div className="form-inner-container">
                        <form onSubmit={handleSubmit}>
                            <label className='info-label'>Item:</label>
                            <input type="text" id="foodName" name="foodName"
                                    className="form-input"
                                    placeholder='Enter the item...'
                                    value={values.foodName}
                                    onChange={handleInput}
                                    required />

                            <label className='info-label'>Total Weight (in grams):</label>
                            <input type="text" id="weight" name="weight"
                                    className="form-input"
                                    placeholder='Enter the weight...'
                                    value={values.weight}
                                    onChange={handleInput}
                                    required />
                            {errors.weight && <div className="error-text">{errors.weight}</div>}

                            <label className='info-label'>Calories:</label>
                            <input type="text" id="calories" name="calories"
                                    className="form-input"
                                    placeholder='Enter the calories...'
                                    value={values.calories}
                                    onChange={handleInput}
                                    required />
                            {errors.calories && <div className="error-text">{errors.calories}</div>}

                            <label className='info-label'>Protein (in grams):</label>
                            <input type="text" id="protein" name="protein"
                                    className="form-input"
                                    placeholder='Enter the protein...'
                                    value={values.protein}
                                    onChange={handleInput}
                                    required />
                            {errors.protein && <div className="error-text">{errors.protein}</div>}

                            <label className='info-label'>Fats (in grams):</label>
                            <input type="text" id="fats" name="fats"
                                    className="form-input"
                                    placeholder='Enter the fats...'
                                    value={values.fats}
                                    onChange={handleInput}
                                    required />
                            {errors.fats && <div className="error-text">{errors.fats}</div>}

                            <label className='info-label'>Carbs (in grams):</label>
                            <input type="text" id="carbs" name="carbs"
                                    className="form-input"
                                    placeholder='Enter the carbs...'
                                    value={values.carbs}
                                    onChange={handleInput}
                                    required />
                            {errors.carbs && <div className="error-text">{errors.carbs}</div>}

                            <input type="submit" id="submit" name="submit" className="submit" />
                        </form>
                        </div>
                    </div>
                </div>
                <div className="macro-container">
                    <div className="main-data-container">
                        
                        <div className="macro-list">
                            <div className="macro-table">
                                <div className="macro-list-container">
                                    <p className="macro-details-heading">Item</p>
                                    <p className="macro-details-heading">Weight</p>
                                    <p className="macro-details-heading">Calories</p>
                                    <p className="macro-details-heading">Protein</p>
                                    <p className="macro-details-heading">Fats</p>
                                    <p className="macro-details-heading">Carbs</p>
                                    <p className="delete-button-container">Delete</p>
                                </div>
                                {nutritionData.map((macro) => (
                                    <div key={macro.id} className="macro-list-container">
                                        <GetMacros key={macro.id} macro={macro}/>
                                        <button onClick={() => handleDelete(macro.id)} className="delete-button"><RiDeleteBinLine size={28} /></button>  
                                    </div>    
        
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
