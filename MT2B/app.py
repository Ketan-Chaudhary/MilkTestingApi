import os
import uuid
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

# HSV color ranges for adulterants
COLOR_RANGES = {
    "starch": {"low": (100, 150, 50), "high": (140, 255, 255)},  # Blue
    "urea": {"low": (25, 150, 100), "high": (35, 255, 255)},     # Yellow
    "detergent": {"low": (0, 0, 200), "high": (180, 30, 255)},   # White/Gray
    "hydrogen_peroxide": {"low": (160, 50, 50), "high": (170, 255, 255)},  # Pink
    "boric_acid": {"low": (40, 100, 100), "high": (80, 255, 255)},  # Green
    "neutralizer": {"low": (80, 50, 50), "high": (100, 255, 255)},  # Cyan
    "MQ1": {"low": (100, 150, 50), "high": (120, 255, 255)},  # Deep Blue
    "MQ2": {"low": (10, 100, 100), "high": (20, 255, 255)},   # Brown
    "formalin": {"low": (140, 100, 100), "high": (160, 255, 255)},  # Purple
    "ammonium_sulphate": {"low": (20, 150, 150), "high": (30, 255, 255)},  # Light Yellow
    "sugar": {"low": (0, 50, 50), "high": (10, 255, 255)},  # Red
}

# Function to detect adulterants in the image
def detect_adulterant(image_path):
    try:
        # Load the image and convert to HSV
        img = cv2.imread(image_path)
        if img is None:
            return "invalid_image"

        hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        # Check each predefined range
        for adulterant, ranges in COLOR_RANGES.items():
            mask = cv2.inRange(hsv_img, np.array(ranges["low"]), np.array(ranges["high"]))
            if cv2.countNonZero(mask) > 0:
                return adulterant

        return "natural"
    except Exception as e:
        return f"error: {str(e)}"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if an image is provided in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        # Save the uploaded file
        file = request.files['image']
        if not file:
            return jsonify({'error': 'Invalid file'}), 400

        extension = file.filename.split('.')[-1]
        file_path = f"uploads/{uuid.uuid4()}.{extension}"

        # Ensure the uploads directory exists
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)

        # Process the image and detect adulterants
        result = detect_adulterant(file_path)

        # Clean up the saved file
        os.remove(file_path)

        # Return the result
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)
