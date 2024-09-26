import React, { useEffect, useState} from 'react';
import Navbar from './Navbar.jsx';
import Validation from './FitnessValidation.jsx';
import axios from 'axios';
import GetFitnessData from './GetFitnessData.jsx';
import { RiDeleteBinLine } from '@remixicon/react';

export default function Fitness() {

    const [username, setusername] = useState('');

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setusername(usernameFromStorage);
        } else {
            console.log("No username found in local storage");
        }
    }, []);

    const [values, setvalues] = useState({
        exerciseName: '',
        sets: '',
        caloriesBurned: '',
        username: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setvalues(prevState => ({...prevState, [name]: value}));
        validateForm();
    }

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }

    const [fitnessData, setFitnessData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:8080/Fitness', { ...values, username: username })
            .then (res => {
                    console.log('Workout added successfully:', res.data);
                    setFitnessData(prevData => [...prevData, {username: res.data.username, ...values}]);
                    setvalues({
                        exerciseName: '',
                        sets: '',
                        caloriesBurned: '',
                        username: ''
                    });
                })
                .catch(err => {
                    console.error('Error adding log:', err);
                });
        } else {
            console.log('Validation errors:', errors);
        }
    }

    useEffect(() => {
        fetchFitnessData();
    },  [setusername]);

    useEffect(() => {
        // Fetch nutrition data for userId
        const fetchFitnessData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Fitness/${username}`);
                setFitnessData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (username) {
            fetchFitnessData();
        }
    }, [username]);

    const fetchFitnessData = async () => {
        try {
            if (!username) return;

            const response = await axios.get(`http://localhost:8080/Fitness/${username}`);
            setFitnessData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/Fitness/${id}`);
            console.log('Macro deleted successfully:', id);
            setFitnessData(prevData => prevData.filter(fitnessData => fitnessData.id !== id)); 
        } catch (error) {
            console.error('Error deleting macro:', error);
        }
    }

    return (
        <>
            <Navbar /> 
            <div className="main-container">
            <div className="main-container-heading">
                    <h1>Track Your Workouts</h1>
                </div>
                <div className="form-main-container">
                        <div className="form-container">
                            <div className="form-inner-container">
                            <form onSubmit={handleSubmit}>

                                <label className='info-label'>Exercise Name:</label>
                                <input type="text" id="exerciseName" name="exerciseName"
                                    className="form-input"
                                    placeholder='Enter the exercise...'
                                    value={values.exerciseName}
                                    onChange={handleChange}
                                    required />

                                <label className='info-label'>Sets:</label>
                                <input type="text" id="sets" name="sets"
                                    className="form-input"
                                    placeholder='Enter the number of sets...'
                                    value={values.sets}
                                    onChange={handleChange}
                                    required />
                                {errors.sets && <div className="error-text">{errors.sets}</div>}

                                
                                <label className='info-label'>Calories Burned:</label>
                                <input type="text" id="caloriesBurned" name="caloriesBurned"
                                    className="form-input"
                                    placeholder='Enter the calories burned...'
                                    value={values.caloriesBurned}
                                    onChange={handleChange}
                                    required/>
                                {errors.caloriesBurned && <div className="error-text">{errors.caloriesBurned}</div>}
                            
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
                                    <p className="fitness-details-heading">Exercise</p>
                                    <p className="fitness-details-heading">Sets</p>
                                    <p className="fitness-details-heading">Calories Burned</p>
                                    <p className="delete-button-container">Delete</p>
                                </div>
                                {fitnessData.map((fitnessData) => (
                                    <div key={fitnessData.id} className="macro-list-container">
                                        <GetFitnessData key={fitnessData.id} fitnessData={fitnessData}/>
                                        <button onClick={() => handleDelete(fitnessData.id)} className="delete-button"><RiDeleteBinLine size={28} /></button>
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