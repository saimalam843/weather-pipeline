import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Load and preprocess data
data = pd.read_csv('processed_data.csv')
X = data[['humidity', 'wind_speed']]
y = data['temperature']

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
