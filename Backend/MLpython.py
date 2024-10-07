from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the dataset globally (for simplicity)
file_path = 'c:/Users/saurashis bose/Downloads/Disease_symptom_and_patient_profile_dataset.csv'
df = pd.read_csv(file_path)

# Function to match inputs with the dataset
def match_inputs(df, col2_input, col3_input, col4_input, col5_input, col7_input, col8_input, col9_input):
    df.iloc[:, 1] = df.iloc[:, 1].astype(str).str.lower()  # col2
    df.iloc[:, 2] = df.iloc[:, 2].astype(str).str.lower()  # col3
    df.iloc[:, 3] = df.iloc[:, 3].astype(str).str.lower()  # col4
    df.iloc[:, 4] = df.iloc[:, 4].astype(str).str.lower()  # col5
    df.iloc[:, 6] = df.iloc[:, 6].astype(str).str.lower()  # col7 (Male/Female)
    df.iloc[:, 7] = df.iloc[:, 7].astype(str).str.lower()  # col8 (Blood Pressure)
    df.iloc[:, 8] = df.iloc[:, 8].astype(str).str.lower()  # col9 (Cholesterol)
    df.iloc[:, 9] = df.iloc[:, 9].astype(str).str.lower()  # col10 (Positive/Negative)
    
    match = df[(df.iloc[:, 1] == col2_input) & (df.iloc[:, 2] == col3_input) &
               (df.iloc[:, 3] == col4_input) & (df.iloc[:, 4] == col5_input) &
               (df.iloc[:, 6] == col7_input) & (df.iloc[:, 7] == col8_input)
               ]
    
    
    if not match.empty:
        return jsonify({'result': match.iloc[0,0]})
    else:
        return "No match found or no positive result."
        

@app.route('/get_result', methods=['POST'])
def get_result():
    try:
        # Get the data from the request (expecting JSON)
        data = request.json
        print(data)
        col2_input = data.get('fever').lower()
        col3_input = data.get('cough').lower()
        col4_input = data.get('fatigue').lower()
        col5_input = data.get('difficulty').lower()
        col7_input = "Female".lower()
        col8_input = data.get('bp').lower()
        col9_input = data.get('cholesterol')
        print(col2_input)
        print(col3_input)
        print(col4_input)
        print(col5_input)
        print(col7_input)
        print(col8_input)
        print(col9_input)
        print(request)

        # Match inputs
        result = match_inputs(df, col2_input, col3_input, col4_input, col5_input, col7_input, col8_input, col9_input)
        
        return result, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)