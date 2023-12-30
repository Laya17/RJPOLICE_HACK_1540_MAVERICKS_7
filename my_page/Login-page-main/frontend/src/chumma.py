# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline


df = pd.read_csv(r'C:\Users\laya_\Downloads\my_page\Login-page-main\ML\transaction_final.csv')


print("Column Names:", df.columns)


feature_cols = ['TransactionAmount', 'Timestamp']

target_col = 'anomaly'

X = df[feature_cols]
y = df[target_col]


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = Pipeline([
    ('scaler', StandardScaler()),  
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))  
])


model.fit(X_train, y_train)


y_pred = model.predict(X_test)


accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Accuracy: {accuracy}")
print("Classification Report:\n", report)
