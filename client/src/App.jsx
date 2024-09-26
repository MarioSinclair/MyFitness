import React from "react";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Registration from "./pages/registration.jsx"
import LogIn from "./pages/LogIn.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Fitness from "./pages/Fitness.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import Goals from "./pages/Goals.jsx";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './pages/Home.css';
 
export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Fitness" element={<Fitness />} />
            <Route path="/Nutrition" element={<Nutrition />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/UserInfo" element={<UserInfo />} />
            <Route path="/Goals" element={<Goals />} />
        </Routes>
        </BrowserRouter>
    );
}
 