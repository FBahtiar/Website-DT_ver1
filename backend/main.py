from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model_service import ModelService
import shutil
import os

app = FastAPI(title="Video Classification API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_service = ModelService()

@app.get("/")
def read_root():
    return {"message": "Deep Learning Video Classification API is running"}

@app.post("/classify")
async def classify_video(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.endswith(".mp4"):
        raise HTTPException(status_code=400, detail="Only .mp4 files are supported.")
    
    # Read file content
    try:
        file_bytes = await file.read()
        
        # Process the video
        result = await model_service.process_video(file_bytes, file.filename)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
