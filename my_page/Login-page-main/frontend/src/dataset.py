import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)


user_data = pd.DataFrame({
    'CustomerID': [1, 2, 3, 4, 5],
    'Name': ['User1', 'User2', 'User3', 'User4', 'User5'],
    'Email': ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com'],
    'ContactNumber': ['+1234567890'] * 5,
    'AccountBalance': np.random.uniform(500, 5000, 5),
    'MonthlySalary': np.random.uniform(2000, 8000, 5),
    'NumTransactions': np.random.randint(5, 30, 5)
})


user_data.to_csv('user_data.csv', index=False)


transaction_data = pd.DataFrame(columns=[
    'TransactionID', 'SenderID', 'ReceiverID', 'Amount', 'RemainingBalance', 'Date', 'Time', 'Password', 'IsAnomaly'
])

normal_transaction_amounts = np.random.uniform(1, 100, 450)
normal_transaction_dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(1, 365)) for _ in range(450)]
normal_transaction_times = [datetime(2023, 1, 1, np.random.randint(8, 18), np.random.randint(0, 60)) for _ in range(450)]
normal_transaction_passwords = ["password" for _ in range(450)]
normal_transaction_is_anomaly = [0] * 450

anomalous_transaction_amounts = np.random.uniform(500, 1000, 50)
anomalous_transaction_dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(1, 365)) for _ in range(50)]
anomalous_transaction_times = [datetime(2023, 1, 1, np.random.randint(0, 8), np.random.randint(0, 60)) for _ in range(50)]
anomalous_transaction_passwords = ["password" for _ in range(50)]
anomalous_transaction_is_anomaly = [1] * 50

amounts = np.concatenate([normal_transaction_amounts, anomalous_transaction_amounts])
dates = np.concatenate([normal_transaction_dates, anomalous_transaction_dates])
times = np.concatenate([normal_transaction_times, anomalous_transaction_times])
passwords = np.concatenate([normal_transaction_passwords, anomalous_transaction_passwords])
is_anomaly = np.concatenate([normal_transaction_is_anomaly, anomalous_transaction_is_anomaly])

indices = np.arange(len(amounts))
np.random.shuffle(indices)

amounts = amounts[indices]
dates = dates[indices]
times = times[indices]
passwords = passwords[indices]
is_anomaly = is_anomaly[indices]

sender_ids = np.random.choice(user_data['CustomerID'].values, 500)
receiver_ids = np.random.choice(user_data['CustomerID'].values, 500)

mask = sender_ids != receiver_ids
unique_receiver_ids = np.random.choice(user_data['CustomerID'].values, mask.sum())
receiver_ids[mask] = unique_receiver_ids

amounts[mask] = np.random.uniform(500, 1000, mask.sum())
dates[mask] = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(1, 365)) for _ in range(mask.sum())]
times[mask] = [datetime(2023, 1, 1, np.random.randint(0, 8), np.random.randint(0, 60)) for _ in range(mask.sum())]
passwords[mask] = ["password" for _ in range(mask.sum())]
is_anomaly[mask] = 1

remaining_balance = []
for sender_id, amount in zip(sender_ids, amounts):
    remaining_balance.append(user_data.loc[user_data['CustomerID'] == sender_id, 'AccountBalance'].values[0] - amount)

transaction_data = pd.DataFrame({
    'TransactionID': np.arange(1, 501),
    'SenderID': sender_ids,
    'ReceiverID': receiver_ids,
    'Amount': amounts,
    'RemainingBalance': remaining_balance,
    'Date': dates,
    'Time': times,
    'Password': passwords,
    'IsAnomaly': is_anomaly.astype(int).tolist()
})

transaction_data.to_csv('transaction_data.csv', index=False)
