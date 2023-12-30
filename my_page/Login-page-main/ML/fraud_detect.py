import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import pickle

def train_and_save_model(user_data_path, transaction_data_path, model_save_path='fraud_detection_model.pkl'):
    user_data = pd.read_excel(user_data_path)
    transaction_data = pd.read_csv(transaction_data_path)
    merged_data = pd.merge(transaction_data, user_data, left_on='CustomerID', right_on='CustomerID', how='left')
    merged_data['Timestamp'] = pd.to_datetime(merged_data['Timestamp'], dayfirst=True)
    merged_data['DynamicIncome'] = merged_data['types of other income than salary'] * (1 + merged_data['Timestamp'].dt.month)
    merged_data['NumTransactions'] = merged_data.groupby('CustomerID').cumcount() + 1
    features = ['TransactionAmount', 'account balance', 'DynamicIncome', 'NumTransactions']
    scaler = StandardScaler()
    merged_data[features] = scaler.fit_transform(merged_data[features])
    
    X_train, X_test, y_train, y_test = train_test_split(
        merged_data[features], merged_data['IsFraud'], test_size=0.2, random_state=42
    )

    scaler = StandardScaler()
    X_train[features] = scaler.fit_transform(X_train[features])

    model = IsolationForest(contamination=0.01, random_state=42)
    model.fit(X_train)

    with open(model_save_path, 'wb') as file:
        pickle.dump((model, scaler), file)

    print(f"Model trained and saved as {model_save_path}")

def load_model_and_predict(new_transaction_data, model_load_path='fraud_detection_model.pkl'):
    with open(model_load_path, 'rb') as file:
        model, scaler = pickle.load(file)

    new_transaction_scaled = scaler.transform(new_transaction_data)
    prediction = model.predict(new_transaction_scaled)

    return int(prediction[0])

user_data_path = r"C:\Users\laya_\Downloads\my_page\Login-page-main\ML\user_data.xlsx"
transaction_data_path = r"C:\Users\laya_\Downloads\my_page\Login-page-main\ML\transactions_dataset2.csv"

train_and_save_model(user_data_path, transaction_data_path)

new_transaction_data = pd.DataFrame({
    'TransactionAmount': [5000],
    'account balance': [10000],
    'DynamicIncome': [2000],
    'NumTransactions': [5],
})

prediction_result = load_model_and_predict(new_transaction_data)

print("Prediction Result:", "Fraudulent Transaction" if prediction_result == 1 else "Non-Fraudulent Transaction")
