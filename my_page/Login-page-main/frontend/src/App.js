

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import UserHomePage from './UserHomePage';
import MakeTransactionPage from './MakeTransactionPage';
import TransactionSuccessPage from './TransactionSuccessPage';
import TransactionHistoryPage from './TransactionHistoryPage'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user/:customerId" element={<UserHomePage />} />
                <Route path="/make-transaction/:customerId" element={<MakeTransactionPage />} />
                <Route path="/transaction-success" element={<TransactionSuccessPage />} />
                <Route path="/transaction-history/:customerId" element={<TransactionHistoryPage />} />
            </Routes>
        </Router>
    );
}

export default App;
