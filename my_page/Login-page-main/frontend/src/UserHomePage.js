// UserHomePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './UserHomePage.css'; 
import BackgroundImage from './images/bg.jpg';

function UserHomePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { customerId } = useParams();

    useEffect(() => {
        if (customerId) {
            console.log('Fetching transaction history for customerId:', customerId);

            axios.get(`http://localhost:5000/user/${customerId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [customerId]);

    return (
        <div className="user-home-page" style={Headers}>
            {loading && <p>Loading user data...</p>}
            {error && <p>Error fetching user data. Please try again later.</p>}
            {userData && (
                <div>
                    <div className="user-details">
                        <div className="profile-picture">
                           
                            <img src="https://via.placeholder.com/150" alt="Profile" />
                        </div>
                        <div className="user-info">
                        <p style={{ color: 'white' }}><strong>Name:</strong> {userData.name}</p>
                            <p style={{ color: 'white' }}><strong>Email:</strong> {userData.email}</p>
                            <p style={{ color: 'white' }}><strong>Age:</strong> {userData.age}</p>
                            <p style={{ color: 'white' }}><strong>Address:</strong> {userData.address}</p>
                        </div>
                    </div>
                    <div className="user-actions">
                        <Link to={`/make-transaction/${customerId}`} className="action-button">
                            Make Transaction
                        </Link>
                        <Link to={`/transaction-history/${customerId}`} className="action-button">
                            View Transactions
                        </Link>



                        <Link to={`/money-flow-visualization/${customerId}`} className="action-button">
                            Money Flow Visualization
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

const Headers = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`, 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"

};

export default UserHomePage;


