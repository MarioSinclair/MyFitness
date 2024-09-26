import {React, useState, useEffect  } from 'react';
import './Dashboard.css';
import Navbar from './Navbar.jsx';
import { DoughnutChartComponent } from './Doughnut-chart.jsx';
import { BarChartComponent } from './bar-chart.jsx'
import { RiRestaurant2Fill, RiRunLine, RiFireFill } from '@remixicon/react';
import axios from 'axios';

export default function Dashboard() {

    const [username, setusername] = useState('');

    useEffect(() => {
        const usernameFromStorage = localStorage.getItem('username');
        if (usernameFromStorage) {
            setusername(usernameFromStorage);
        }
    }, []);

    const [TotalCalories, setTotalCalories] = useState(0);
    const [Protein, setTotalProtein] = useState(0);
    const [Fats, setTotalFats] = useState(0);
    const [Carbs, setTotalCarbs] = useState(0);
    const [CaloriesBurned, setCaloriesBurned] = useState(0);

    const [CalorieGoal, setCalorieGoal] = useState(0);

    useEffect(() => {
        // Fetch nutrition data for userId
        const fetchNutritionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/nutrition/${username}`);
                const data = response.data;
    
                const totalCalories = data.reduce((acc, curr) => acc + curr.calories, 0);
                const totalProtein = data.reduce((acc, curr) => acc + curr.protein, 0);
                const totalFats = data.reduce((acc, curr) => acc + curr.fats, 0);
                const totalCarbs = data.reduce((acc, curr) => acc + curr.carbs, 0);
        
                setTotalCalories(totalCalories);
                setTotalProtein(totalProtein);
                setTotalFats(totalFats);
                setTotalCarbs(totalCarbs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchGoalsData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/goals/${username}`);
                const data = response.data;
                setCalorieGoal(data[0].calorieGoal);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (username) {
            fetchNutritionData();
            fetchGoalsData();
        }
    }, [username]);

    useEffect(() => {
        // Fetch nutrition data for userId
        const fetchFitnessData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Fitness/${username}`);
                const data = response.data;
    
                const CaloriesBurned = data.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

                setCaloriesBurned(CaloriesBurned);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (username) {
            fetchFitnessData();
        }
    }, [username]);

    const handleClick = () => {
        window.location.href = '/Fitness'
    };

    return (
        <>
            <Navbar />
            <div className='dashboard-page-container'>
                <div className='dashboard-heading-container'>
                    <h1>Welcome back, {username}!</h1>
                </div>

                <div className='main-dashboard-container'>
                    <div className='main-dashboard-inner-container'>    
                        <div className="calories-main-container">
                        <div className="calories-inner-container">
                            <div className="calories-heading-container">
                                <h1 className="nutrition-text" >Calories</h1>
                            </div>
                            <div className="calories-container"> 
                                <div className='calories-graph-container'>
                                {CalorieGoal !== 0 && TotalCalories !== 0 && CaloriesBurned !== 0 &&(
                                        <DoughnutChartComponent CalorieGoal={CalorieGoal} TotalCalories={TotalCalories} CaloriesBurned={CaloriesBurned} />
                                    )}     
                                </div>
                                <div className='calories-text-container'>
                                <div className="calories-section">
                                        <h2 className="data-title">Daily Goal</h2>
                                        <div className="data-value">
                                            <div className="icon">
                                                <RiFireFill 
                                                color='rgb(0, 255, 0)'
                                                />
                                            </div>
                                            <div className="value">
                                                {CalorieGoal} Cals
                                            </div>
                                        </div>
                                    </div>
                                    <div className="calories-section">
                                        <h2 className="data-title">Calories Consumed</h2>
                                        <div className="data-value">
                                            <div className="icon">
                                                <RiRestaurant2Fill 
                                                color='rgb(98, 0, 255)'
                                                /> 
                                            </div>
                                            <div className="value">
                                                {TotalCalories.toLocaleString()} Cals
                                            </div>
                                        </div>
                                    </div>

                                    <div className="calories-section">
                                        <h2 className="data-title">Calories Burned</h2>
                                        <div className="data-value">
                                            <div className="icon">
                                                <RiRunLine 
                                                color='rgb(255, 98, 0)'
                                                />
                                            </div>
                                            <div className="value">
                                                {CaloriesBurned.toLocaleString()} Cals
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button-container">
                                <button className="add-button" onClick={handleClick}> + Add Workout</button>
                            </div>
                        </div>
                        </div>
                        <div className="nutrition-main-container">
                            <div className="nutrition-inner-container">
                                <div className="nutrition-heading-container">
                                    <h1 className="nutrition-text">Nutrition</h1>
                                </div>
                                <div className="nutrition-container"> 
                                    <div className='nutrition-graph-container'>
                                        {Protein !== 0 && Carbs !== 0 && Fats !== 0 &&(
                                            <BarChartComponent Protein={Protein} Carbs={Carbs} Fats={Fats} />
                                        )}
                                    </div>
                                    <div className='nutrition-text-container'>
                                    <div className="nutrition-section">
                                            <h2 className="data-title">Protein</h2>
                                            <div className="data-value">
                                                <div className="icon">
                                                    <RiFireFill 
                                                    color='rgb(0, 255, 0)'
                                                    />
                                                </div>
                                                <div className="value">
                                                    {Protein.toLocaleString()} grams
                                                </div>
                                            </div>
                                        </div>
                                        <div className="calories-section">
                                            <h2 className="data-title">Carbohydrates</h2>
                                            <div className="data-value">
                                                <div className="icon">
                                                    <RiRestaurant2Fill 
                                                    color='rgb(98, 0, 255)'
                                                    /> 
                                                </div>
                                                <div className="value">
                                                    {Carbs.toLocaleString()} grams
                                                </div>
                                            </div>
                                        </div>

                                        <div className="calories-section">
                                            <h2 className="data-title">Fats</h2>
                                            <div className="data-value">
                                                <div className="icon">
                                                    <RiRunLine 
                                                    color='rgb(255, 98, 0)'
                                                    />
                                                </div>
                                                <div className="value">
                                                    {Fats.toLocaleString()} grams
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-button-container">
                                    <button className="add-button" onClick={handleClick}> + Add Meal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
        );
    
};



