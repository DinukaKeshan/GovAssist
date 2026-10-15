# backend/src/ml/predict_priority.py

import sys
import joblib
import os

# Get absolute path of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Absolute path to model
model_path = os.path.join(BASE_DIR, "priority_model.pkl")

# Load model safely
model = joblib.load(model_path)

# Read input text
text = sys.argv[1]

# Predict
prediction = model.predict([text])

# Output result
print(prediction[0])
