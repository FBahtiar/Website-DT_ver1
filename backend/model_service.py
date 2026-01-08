import time
import random
from typing import Dict, Any
import requests
from config import MODEL_SERVER_URL

# Simulated deep learning model labels
CLASSES = ["Real Video", "Deepfake Generated"]
DESCRIPTIONS = [
    "Video ini terdeteksi asli dan tidak menunjukkan tanda-tanda manipulasi AI.",
    "Video ini memiliki anomali visual yang mengindikasikan bahwa ini adalah hasil generasi AI (Deepfake)."
]

class ModelService:
    def __init__(self):
        pass

    def process_video_mock(self, filename: str) -> Dict[str, Any]:
        """
        Simulates processing time and returns a mock result.
        This is used if no external server is connected or for testing.
        """
        time.sleep(2)  # Simulate processing delay
        
        # Randomly choose a result for demonstration
        idx = random.randint(0, 1)
        confidence = random.uniform(0.75, 0.99)
        
        return {
            "class_name": CLASSES[idx],
            "description": DESCRIPTIONS[idx],
            "confidence": confidence,
            "metrics": {
                "accuracy": "98.5%",
                "precision": "97.2%",
                "recall": "96.8%",
                "f1_score": "97.0%"
            }
        }

    async def process_video(self, video_bytes: bytes, filename: str) -> Dict[str, Any]:
        """
        INTEGRATION POINT:
        This function handles the communication with your Deep Learning Server.
        """
        
        # --- OPTION 1: Use the Mock (Default) ---
        # If you don't have the server running yet, keep this line.
        # return self.process_video_mock(filename)
    
        # --- OPTION 2: Real Integration (Uncomment to use) ---
        try:
             # Example of how to send the file to another server
             # response = requests.post(
             #     MODEL_SERVER_URL,
             #     files={"file": (filename, video_bytes, "video/mp4")}
             # )
             # response.raise_for_status()
             # return response.json()
             
             # For now, we will fallback to mock to ensure the UI works immediately
             print(f"Server URL configured as: {MODEL_SERVER_URL}")
             print("Using Mock Model for demonstration needs. Uncomment code in model_service.py to connect to real server.")
             return self.process_video_mock(filename)
             
        except Exception as e:
            print(f"Error connecting to model server: {e}")
            # Fallback error response
            return {
                "error": "Failed to classify video. Please check server connection.",
                "details": str(e)
            }
