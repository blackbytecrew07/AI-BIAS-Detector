from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)   # frontend connect ke liye जरूरी

# ✅ Home route (404 avoid karega)
@app.route("/")
def home():
    return "Backend is running 🚀"

# ✅ Main API
@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    try:
        df = pd.read_csv(file)

        # 🔥 simple dynamic result (different CSV → different output)
        score = min(len(df), 100)

        result = {
            "score": score,
            "status": "Biased" if score > 50 else "Fair",
            "breakdown": [
                {
                    "name": "Sample Bias",
                    "score": score,
                    "color": "#ff4d6d",
                    "desc": f"Dataset contains {len(df)} rows"
                }
            ],
            "metrics": [
                {
                    "icon": "users",
                    "label": "Samples",
                    "value": str(len(df)),
                    "delta": None,
                    "dt": "n"
                }
            ],
            "recs": [
                {
                    "icon": "scale",
                    "bg": "rgba(26,86,255,0.08)",
                    "color": "#1a56ff",
                    "title": "Improve dataset",
                    "desc": "Use more balanced data"
                }
            ]
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)