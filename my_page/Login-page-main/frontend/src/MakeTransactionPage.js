// MakeTransactionPage.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MakeTransactionPage.css';
import BackgroundImage from './images/bg2.jpg';

function MakeTransactionPage() {
    const [senderUserId, setSenderUserId] = useState('');
    const [senderPassword, setSenderPassword] = useState('');
    const [receiverTransactionId, setReceiverTransactionId] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const { customerId } = useParams();
    const navigate = useNavigate();

    const handleSenderUserIdChange = (event) => {
        setSenderUserId(event.target.value);
    };

    const handleSenderPasswordChange = (event) => {
        setSenderPassword(event.target.value);
    };

    const handleReceiverTransactionIdChange = (event) => {
        setReceiverTransactionId(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/transactions/${customerId}`, {
                senderUserId,
                senderPassword,
                receiverTransactionId,
                amount,
                reason,
                customerId,
            });

            const transactionDetails = response.data;

            navigate('/transaction-success', { state: { transactionDetails } });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const handleMakePrediction = async () => {
        try {
            const predictionResponse = await axios.post('http://localhost:5000/make-prediction', {
                amount,
            });
    
            const isFraudulent = predictionResponse.data.prediction;
            setPredictionResult(isFraudulent);
        } catch (error) {
            console.error('Prediction failed:', error);
        }
    };

    return (
        <div className="make-transaction-page" style={Bgstyle}>
            <div id="reg-form">
                <form onSubmit={handleSubmit} id="reg-form-1">
                    <h2 style={{ color: 'white' }}>Make Transaction</h2>
                    <div className="transaction-input">
                        <label htmlFor="senderUserId" style={{ color: 'white' }}>Sender's User ID</label>
                        <input
                            type="text"
                            id="senderUserId"
                            name="senderUserId"
                            value={senderUserId}
                            onChange={handleSenderUserIdChange}
                            placeholder="Enter sender's user ID"
                            required
                        />
                    </div>

                    <div className="transaction-input">
                        <label htmlFor="senderPassword" style={{ color: 'white' }}>Sender's Password</label>
                        <input
                            type="password"
                            id="senderPassword"
                            name="senderPassword"
                            value={senderPassword}
                            onChange={handleSenderPasswordChange}
                            placeholder="Enter sender's password"
                            required
                        />
                    </div>

                    <div className="transaction-input">
                        <label htmlFor="receiverTransactionId" style={{ color: 'white' }}>Receiver's Transaction ID</label>
                        <input
                            type="text"
                            id="receiverTransactionId"
                            name="receiverTransactionId"
                            value={receiverTransactionId}
                            onChange={handleReceiverTransactionIdChange}
                            placeholder="Enter receiver's transaction ID"
                            required
                        />
                    </div>

                    <div className="transaction-input">
                        <label htmlFor="amount" style={{ color: 'white' }}>Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div className="transaction-input">
                        <label htmlFor="reason" style={{ color: 'white' }}>Reason for Transaction</label>
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={handleReasonChange}
                            placeholder="Enter reason for transaction"
                            required
                        />
                    </div>
                    
                    <div className="transaction-button">
                        <button type="submit" style={{ backgroundColor: 'green', color: 'white', border: 'none' }}>Submit</button>
                        {predictionResult !== null && (
                            <p style={{ color: 'white' }}>
                                Prediction Result: {predictionResult === 1 ? 'Fraudulent Transaction' : 'Non-Fraudulent Transaction'}
                            </p>
                        )}
                        <button type="button" onClick={handleMakePrediction} style={{ backgroundColor: 'blue', color: 'white', border: 'none' }}>Make Prediction</button>
                    </div>
                </form>
            </div>
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


export default MakeTransactionPage;




  