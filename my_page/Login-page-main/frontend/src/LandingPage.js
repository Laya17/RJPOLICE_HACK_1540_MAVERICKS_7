import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 
import BackgroundImage from './images/bg.jpg'; 
import LogoImage from './images/rj-icon.png'; 

export default function LandingPage() {
    return (
        <header style={HeaderStyle}>
            <div className="logo-container">
                <img src={LogoImage} alt="Your Logo" className="logo" />
            </div>
            <h1 className="main-titles text-center">Your safe Banking App! - Rajasthan Police</h1>
            <p className="main-para text-center"></p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button" id="reg_btn">
                        <span>LOGIN </span>
                    </button>
                </Link>
                <Link to="/Signup">
                    <button className="primary-button" id="reg_btn">
                        <span>REGISTER </span>
                    </button>
                </Link>
            </div>
        </header>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`, 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};
