
from flask_cors import cross_origin
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql.cursors
import uuid
from datetime import datetime
from sklearn.preprocessing import StandardScaler
import pickle
import pandas as pd


app = Flask(__name__)
CORS(app, origins='http://localhost:3000')


with open('fraud_detection_model.pkl', 'rb') as file:
    model, scaler, features = pickle.load(file)






db = pymysql.connect(
    host='localhost',
    user='root',
    password='kavilaya',
    db='RJHACKATHON',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/storeUserData', methods=['POST'])
def store_user_data():
    try:
        data = request.json
        name = data['name']
        email = data['email']
        password = data['password']
        age = data.get('age')
        address = data.get('address')

        query = "INSERT INTO users (name, email, password, age, address) VALUES (%s, %s, %s, %s, %s)"

        with db.cursor() as cursor:
            cursor.execute(query, (name, email, password, age, address))
            db.commit()

        return jsonify({"message": "User data stored successfully"}), 200

    except Exception as e:
        print(str(e))
        return jsonify({"message": "Error storing user data in the database"}), 500
    
@app.route('/make-prediction', methods=['POST'])
@cross_origin()
def make_prediction():
    try:
        data = request.json

        transaction_amount = data['amount']
        account_balance = 10000 
        dynamic_income = 50000  
        num_transactions = 5 

        
        features = ['TransactionAmount', 'account balance', 'DynamicIncome', 'NumTransactions']
        input_data = pd.DataFrame({
            'TransactionAmount': [transaction_amount],
            'account balance': [account_balance],
            'DynamicIncome': [dynamic_income],
            'NumTransactions': [num_transactions],
        })

        
        input_data[features] = scaler.transform(input_data[features])

        
        prediction = model.predict(input_data[features])

       
        return jsonify({"prediction": int(prediction[0])}), 200

    except Exception as e:
        print(str(e)) 
        return jsonify({"message": "Error making the prediction"}), 500




@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        customerId = data['customerId']
        password = data['password']

        query = "SELECT * FROM users WHERE Customer_id = %s"
        with db.cursor() as cursor:
            cursor.execute(query, (customerId,))
            user = cursor.fetchone()

        try:
            
            with db.cursor() as cursor:
                cursor.execute("SELECT 1")
            print("Connected to MySQL database")
        except pymysql.MySQLError as e:
            print(f"Error connecting to MySQL database: {e}")

        if user and password == user['password']:
            
            return jsonify({"message": "Login successful", "customer_id": user["Customer_id"]}), 200
        else:
            
            return jsonify({"message": "Invalid CustomerId or password"}), 401

    except Exception as e:
        print(str(e))
        return jsonify({"message": "Error during login"}), 500


@app.route('/user/<int:customerId>', methods=['GET'])
def get_user_data(customerId):
    try:
        
        query = "SELECT * FROM users WHERE Customer_id = %s"
        with db.cursor() as cursor:
            cursor.execute(query, (customerId,))
            user = cursor.fetchone()

            if user:
              
                return jsonify(user), 200
            else:
                
                return jsonify({"message": "User not found"}), 404
            

    except Exception as e:
        print(str(e))
        return jsonify({"message": "Error fetching user data"}), 500
    



@app.route('/transactions/<int:customerId>', methods=['POST'])
def handle_transaction(customerId):
    try:
        data = request.json

        
        sender_user_id = data['senderUserId']
        sender_password = data['senderPassword']
        receiver_transaction_id = data['receiverTransactionId']
        amount = data['amount']
        reason = data['reason']
       
        query = "SELECT * FROM users WHERE Customer_id = %s AND password = %s"
        with db.cursor() as cursor:
            cursor.execute(query, (customerId, sender_password))
            sender_user = cursor.fetchone()

        if not sender_user:
            return jsonify({"message": "Invalid sender credentials"}), 401

       
        transaction_id = str(uuid.uuid4())

       
        insert_query = "INSERT INTO transactions (transaction_id, sender_user_id, receiver_transaction_id, amount, reason) VALUES (%s, %s, %s, %s, %s)"
        with db.cursor() as cursor:
            cursor.execute(insert_query, (transaction_id, sender_user_id, receiver_transaction_id, amount, reason))
            db.commit()

        
        current_datetime = datetime.now()
        date_str = current_datetime.strftime('%Y-%m-%d')
        time_str = current_datetime.strftime('%I:%M %p')


        response_data = {
            'transactionId': transaction_id,
            'date': date_str,
            'time': time_str,
            'details': {
                'senderUserId': sender_user_id,
                'receiverTransactionId': receiver_transaction_id,
                'amount': amount,
                'reason': reason,
            },
        }

        return jsonify(response_data), 200

    except Exception as e:
        print(str(e))
        return jsonify({"message": "Error handling the transaction"}), 500

@app.route('/transaction-history/<int:customerId>', methods=['GET'])
def get_transaction_history(customerId):
    try:
       
        query = "SELECT * FROM transactions WHERE sender_user_id = %s OR receiver_transaction_id = %s"
        with db.cursor() as cursor:
            cursor.execute(query, (customerId, customerId))
            transactions = cursor.fetchall()

            print(f"SQL Query: {query} with parameters ({customerId}, {customerId})")
            print("Fetched Transactions:", transactions)

            return jsonify(transactions), 200

    except Exception as e:
        print(str(e))
        return jsonify({"message": "Error fetching transaction history"}), 500

    


if __name__ == '__main__':
    app.run(debug=True)


