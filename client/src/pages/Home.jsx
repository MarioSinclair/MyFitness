import './Home.css';
import background from '../assets/background.jpg';
import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
        <Navbar />
        <div className="main-container">
            <div className="background-image-container">
                <img src={background} className="background-image"/>
            </div>
            <div className="overlay-text-container">
                <div className="overlay-heading-container">
                <h1>START YOUR JOURNEY TODAY</h1>
                </div>
                <div className="overlay-text">
                <p>Achieve your fitness goals with personalized workout plans and precise macro tracking tools. Join today to optimize your health and performance.</p>
                </div>
                <div className="overlay-button-container">
                <Link to="/Registration" className="overlay-button">GET STARTED</Link>
                </div>  
            </div>
            </div>
        
        </>
    )
}
