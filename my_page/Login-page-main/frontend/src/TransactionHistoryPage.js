// TransactionHistoryPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TransactionPageHistory.css';
import BackgroundImage from './images/bg2.jpg';

function TransactionHistoryPage() {
    const [transactions, setTransactions] = useState([]);
    const { customerId } = useParams();

    useEffect(() => {
        if (customerId) {
            const fetchTransactionHistory = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/transaction-history/${customerId}`);
                    console.log('Transaction History Response:', response.data);
                    setTransactions(response.data);
                } catch (error) {
                    console.error('Error fetching transaction history:', error);
                }
            };

            fetchTransactionHistory();
        }
    }, [customerId]);

   
    console.log('Transactions:', transactions);

    return (
        <div className="transaction-history-page" style={Bgstyle}>
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Sender's User ID</th>
                        <th>Receiver's Transaction ID</th>
                        <th>Amount</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transaction_id}>
                            <td>{transaction.transaction_id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.time}</td>
                            <td>{transaction.sender_user_id}</td>
                            <td>{transaction.receiver_transaction_id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default TransactionHistoryPage;
