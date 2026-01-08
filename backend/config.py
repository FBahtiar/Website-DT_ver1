import os
from dotenv import load_dotenv

load_dotenv()

# Configuration for the AI Model Server
# You can change this to your actual server URL in a .env file or directly here
MODEL_SERVER_URL = os.getenv("MODEL_SERVER_URL", "http://localhost:8000/mock_model")
