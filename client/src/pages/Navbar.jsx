import { RiLoginBoxLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut.jsx';
import UserAuth from './UserAuth.jsx';

export default function Nav() {

    const isLoggedIn = UserAuth();
    
    return  (
        <section className='nav-section'>
                    {isLoggedIn ?
                        <div className="nav-container">
                        <div className="logo-container">

                        </div>
                        <div className="logo-text">
                            <Link to="/Dashboard" className="nav-link">MyFitness</Link>
                        </div>
                            <div className="nav-links">
                                <Link to="/Dashboard" className="nav-link">Home</Link>
                                <Link to="/Fitness" className="nav-link">Fitness</Link>
                                <Link to="/Nutrition" className="nav-link">Nutrition</Link>
                                
                                </div>
                                <div className="sign-in-container">
                                    <LogOut />
                                </div>
                        </div>
                    :
                        <div className="nav-container">
                            <div className="nav-inner-container">
                            
                                <div className="logo-text">
                                    <Link to="/" className="nav-link">MyFitness</Link>
                                </div>
                                <div className="sign-in-container">
                                    <Link to="/Login">
                                    <div className="login-container">
                                    Log In<RiLoginBoxLine
                                        size={25}
                                        className="login-icon"
                                        />
                                    </div>
                                    </Link>
                                    <Link to="/Registration" className="sign-up-container">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    }     
            </section>
    )
}