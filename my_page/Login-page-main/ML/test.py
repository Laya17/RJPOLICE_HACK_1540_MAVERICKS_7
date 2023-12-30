import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt


user_data = pd.read_excel(r"C:\Users\laya_\Downloads\my_page\Login-page-main\ML\user_data.xlsx")
transaction_data = pd.read_csv(r"C:\Users\laya_\Downloads\my_page\Login-page-main\ML\transaction_final.csv")


merged_data = pd.merge(transaction_data, user_data, left_on='CustomerID', right_on='CustomerID', how='left')

merged_data['Timestamp'] = pd.to_datetime(merged_data['Timestamp'], dayfirst=True)

merged_data['DynamicIncome'] = merged_data['types of other income than salary'] * (1 + merged_data['Timestamp'].dt.month)

merged_data['NumTransactions'] = merged_data.groupby('CustomerID').cumcount() + 1

features = ['TransactionAmount', 'account balance', 'DynamicIncome', 'NumTransactions']

scaler = StandardScaler()
scaler.fit(merged_data[features])  

X_train, X_test, y_train, y_test = train_test_split(merged_data[features], merged_data['IsFraud'], test_size=0.2, random_state=42)

model = IsolationForest(contamination=0.01, random_state=42)
model.fit(X_train)

with open('isolation_forest_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)


input_data = pd.DataFrame({
    'TransactionAmount': [500,250,320,40,30000000000],
    'account balance': [500, 1500, 200, 1000, 300],
    'DynamicIncome': [0, 0, 0, 0, 0],  
    'NumTransactions': [1, 1, 1, 1, 1],  
})

input_data.columns = ['TransactionAmount', 'account balance', 'DynamicIncome', 'NumTransactions']

input_data_scaled = scaler.transform(input_data)

input_data['IsFraudPredicted'] = model.predict(input_data_scaled)

print("Input Data with Predictions:")
print(input_data)

