// TransactionSuccessPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import './TransactionSuccessPage.css';
import BackgroundImage from './images/bg2.jpg';

function TransactionSuccessPage() {
    const location = useLocation();
    const transactionDetails = location.state?.transactionDetails || {};

    return (
        <div className="transaction-success-page" style={Bgstyle}>
            <div className="transaction-details">
                <p>Transaction Successful</p>
                <p>
                    Transaction ID: {transactionDetails.transactionId || 'N/A'}<br />
                    Date: {transactionDetails.date || 'N/A'}<br />
                    Time: {transactionDetails.time || 'N/A'}<br />
                    Sender's User ID: {transactionDetails.details?.senderUserId || 'N/A'}<br />
                    Receiver's Transaction ID: {transactionDetails.details?.receiverTransactionId || 'N/A'}<br />
                    Amount: {transactionDetails.details?.amount || 'N/A'}<br />
                    Reason: {transactionDetails.details?.reason || 'N/A'}
                </p>
            </div>
            <p className="thank-you-message">Thank you for transferring!</p>
        </div>
    );
}

const Bgstyle = {
    background: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
};

export default TransactionSuccessPage;
