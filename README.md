<img width="1366" height="731" alt="Screenshot (59)" src="https://github.com/user-attachments/assets/b97ef6d0-8ccd-45a3-be0b-b8d98752fe29" />
<img width="1366" height="730" alt="Screenshot (63)(1)" src="https://github.com/user-attachments/assets/abf85c5d-979c-491c-b765-d7abb5b44c04" />

# ⚖️ AI Bias Detection & Fairness Analyzer

## 📖 Overview
This project detects and analyzes bias in datasets used by AI systems.  
It helps identify unfair patterns, measure bias levels, and suggest improvements to make AI models more ethical and reliable.

---

## 🎯 Objective
To build an accessible tool that:
- Detects bias in datasets
- Calculates bias score
- Provides fairness rating (S–D scale)
- Simulates impact of biased data
- Generates explanations
- Suggests improvements

---

## 🚀 Features

- 🔍 Dataset Bias Detection  
- 📊 Bias Score Calculation  
- ⚖️ Fairness Rating (S–D scale)  
- 🤖 AI Model Simulation (Logistic Regression)  
- 🔄 Before vs After Bias Comparison  
- 💡 Bias Explanation  
- 🛠️ Fix Suggestions  

---

## 🧠 Technologies Used

### 🎨 Frontend
- React.js  
- JavaScript (ES6)  
- HTML, CSS  

### ⚙️ Backend
- Python  
- Flask  

### 🤖 AI / ML
- Pandas  
- Scikit-learn  
- LabelEncoder  

### 🌐 Integration
- REST API  
- Fetch API  
- FormData  

### 🧠 AI Enhancement
- Google Gemini API *(for enhanced explanations & insights)*  

---

## 📁 Project Structure

``` id="s3k9a1"
project/
│── frontend/        # React UI
│── backend/         # Flask server
│── ai_logic.py      # Bias detection logic
│── requirements.txt
│── README.md

## ⚙️ How to Use

### 🔹 1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

---

### 🔹 2. Run Backend (Flask)
cd backend
pip install -r requirements.txt
python app.py

Backend will start at:
http://localhost:5000

---

### 🔹 3. Run Frontend (React)
cd frontend
npm install
npm start

Frontend will start at:
http://localhost:3000

---

### 🔹 4. Use the App
- Upload your dataset (CSV file)
- Select target column and sensitive attribute
- Click **Analyze**
- View bias score, fairness rating, and suggestions

---

### 🔹 5. API Endpoint
POST /analyze
