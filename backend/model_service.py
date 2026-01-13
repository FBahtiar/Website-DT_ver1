import os
import time
import random
import asyncio
import tempfile
import shutil
from typing import Dict, Any
<<<<<<< HEAD
=======
import traceback

# Library untuk Web Framework
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

>>>>>>> Ver4
# Library untuk Machine Vision dan Model
import cv2
import numpy as np
import torch
from scipy.stats import skew, kurtosis
from transformers import CLIPImageProcessor, CLIPVisionModel
import joblib

<<<<<<< HEAD
# Label dan Deskripsi
CLASSES = ["AIGC", "Real"] # Sesuaikan urutan: 0=AI, 1=Real
=======
# --- KONFIGURASI ---
CLASSES = ["AIGC", "Real"] # 0=AI, 1=Real
>>>>>>> Ver4
DESCRIPTIONS = [
    "Video ini memiliki anomali visual yang mengindikasikan bahwa ini adalah hasil generasi AI (Deepfake).",
    "Video ini terdeteksi asli dan tidak menunjukkan tanda-tanda manipulasi AI."
]

<<<<<<< HEAD
class ModelService:
    def __init__(self):
        print("Initializing Model Service...")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Device: {self.device}")
        
        # --- LOAD MODEL SEKALI SAAT STARTUP ---
        try:
            # 1. Load CLIP Model
            self.clip_model_name = "openai/clip-vit-base-patch16"
            self.processor = CLIPImageProcessor.from_pretrained(self.clip_model_name)
            self.vision_model = CLIPVisionModel.from_pretrained(self.clip_model_name)
            self.vision_model.to(self.device)
            self.vision_model.eval()

            # 2. Load LightGBM & Scaler
            # Pastikan file .pkl ada di folder yang sama dengan script ini
            self.lgbm_model = joblib.load("lightgbm_model.pkl")
            self.scaler = joblib.load("scaler.pkl")
            
            print("All models loaded successfully.")
        except Exception as e:
            print(f"CRITICAL ERROR loading models: {e}")
            # Biarkan variabel None agar bisa cek error nanti
            self.lgbm_model = None

    # --- FUNGSI BANTUAN MATEMATIKA (Sama seperti sebelumnya) ---
=======
# Model paths (Pastikan file ini ada di folder yang sama)
LGBM_MODEL_PATH = "lightgbm_model.pkl"
SCALER_PATH = "scaler.pkl"

class ModelService:
    def __init__(self):
        print("[INFO] Initializing Model Service...")
        
        # Cek ketersediaan GPU
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"[INFO] Device used: {self.device}")
        
        # Inisialisasi variabel model
        self.processor = None
        self.vision_model = None
        self.lgbm_model = None
        self.scaler = None
        self.is_ready = False

        # --- LOAD MODEL SEKALI SAAT STARTUP ---
        try:
            # 1. Load CLIP Model (Vision Transformer)
            self.clip_model_name = "openai/clip-vit-base-patch16"
            print(f"[INFO] Loading CLIP model: {self.clip_model_name}...")
            self.processor = CLIPImageProcessor.from_pretrained(self.clip_model_name)
            self.vision_model = CLIPVisionModel.from_pretrained(self.clip_model_name)
            self.vision_model.to(self.device)
            self.vision_model.eval() # Mode evaluasi (tanpa training)

            # 2. Load LightGBM & Scaler
            if os.path.exists(LGBM_MODEL_PATH) and os.path.exists(SCALER_PATH):
                print("[INFO] Loading LightGBM and Scaler...")
                self.lgbm_model = joblib.load(LGBM_MODEL_PATH)
                self.scaler = joblib.load(SCALER_PATH)
            else:
                print("[WARNING] Model files (.pkl) not found! Inference will fail.")
                
            print("[SUCCESS] All models loaded successfully.")
            self.is_ready = True
            
        except Exception as e:
            print(f"[CRITICAL ERROR] Loading models: {e}")
            traceback.print_exc()

    # --- FUNGSI BANTUAN MATEMATIKA (FEATURE ENGINEERING) ---
>>>>>>> Ver4
    def l2_normalize_torch(self, x, eps=1e-8):
        if x.numel() == 0: return x
        return x / (torch.norm(x, dim=-1, keepdim=True) + eps)

    def feature_standardize_torch(self, x, eps=1e-8):
        if x.numel() == 0: return x
        mean = x.mean(dim=0, keepdim=True)
        std = x.std(dim=0, keepdim=True)
        return (x - mean) / (std + eps)

    def calculate_first_order_features(self, features_np):
        if features_np.shape[0] < 2:
<<<<<<< HEAD
=======
            # Jika frame kurang dari 2, kembalikan nol
>>>>>>> Ver4
            return np.zeros((1, features_np.shape[1]))
        x = torch.tensor(features_np, dtype=torch.float32, device=self.device)
        diff = torch.norm(x[1:] - x[:-1], p=2, dim=1, keepdim=True)
        first_frame_diff = torch.zeros(1, diff.shape[1], device=self.device)
        diff = torch.cat([first_frame_diff, diff], dim=0)
        diff = self.l2_normalize_torch(diff)
        diff = self.feature_standardize_torch(diff)
        return diff.cpu().numpy()

    def calculate_second_order_features(self, first_order_np):
        if first_order_np.shape[0] < 3:
            return np.zeros((1, first_order_np.shape[1]))
        x = torch.tensor(first_order_np, dtype=torch.float32, device=self.device)
        f2 = (x[2:] - 2 * x[1:-1] + x[:-2])
        pad = torch.zeros((2, f2.shape[1]), device=self.device)
        f2 = torch.cat([pad, f2], dim=0)
        f2 = self.l2_normalize_torch(f2)
        f2 = self.feature_standardize_torch(f2)
        return f2.cpu().numpy()

    def extract_feature_vector(self, second_order_features):
        if second_order_features is None or second_order_features.size == 0:
            return [0.0] * 6
        flat_features = second_order_features.flatten()
        std_dev = np.std(flat_features)
        mean = np.mean(flat_features)
        max_val = np.max(flat_features)
        min_val = np.min(flat_features)
        if np.isclose(std_dev, 0):
            skewness = 0.0
            kurtosis_val = 0.0
        else:
            skewness = skew(flat_features)
            kurtosis_val = kurtosis(flat_features, fisher=False)
        return [std_dev, mean, max_val, min_val, skewness, kurtosis_val]

<<<<<<< HEAD
    # --- LOGIKA UTAMA INFERENSI (BERJALAN DI THREAD TERpisah) ---
    def _run_inference(self, video_path: str) -> Dict[str, Any]:
        """
        Fungsi blocking ini berisi logika berat (PyTorch + LightGBM).
        Dipanggil oleh asyncio.to_thread agar tidak memblokir server.
        """
        cap = cv2.VideoCapture(video_path)
        target_fps = 8
=======
    # --- LOGIKA UTAMA INFERENSI (DIPERBAIKI) ---
    def _run_inference(self, video_path: str) -> Dict[str, Any]:
        """
        Fungsi blocking ini berisi logika berat.
        VERSI PERBAIKAN: Menggunakan Batch Processing untuk mencegah OOM (Killed Process).
        """
        cap = cv2.VideoCapture(video_path)
        
        # Parameter Sampling & Processing
        target_fps = 8
        max_frames = 64  # Batasi frame total agar tidak berat (cukup 8 detik video)
        batch_size = 8   # Proses 8 frame sekaligus di GPU (Aman untuk sebagian besar VRAM)
>>>>>>> Ver4

        try:
            if not cap.isOpened():
                raise ValueError("Gagal membuka video.")
            
            fps = cap.get(cv2.CAP_PROP_FPS)
            if fps == 0: fps = 30 # Fallback default
            frame_interval = max(1, int(round(fps / target_fps)))
<<<<<<< HEAD
            frames = []
            frame_idx = 0

            # Baca frame
=======
            
            frames = []
            frame_idx = 0

            # 1. Baca dan Sample Frame dari Video
>>>>>>> Ver4
            while True:
                ret, frame = cap.read()
                if not ret: break
                if frame_idx % frame_interval == 0:
<<<<<<< HEAD
=======
                    if len(frames) >= max_frames:
                        break # Hentikan jika sudah mencapai batas frame
>>>>>>> Ver4
                    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    frames.append(frame_rgb)
                frame_idx += 1
            
            if not frames:
<<<<<<< HEAD
                raise ValueError("Video kosong atau tidak terbaca.")
            
            video_frames_np = np.stack(frames)
            inputs = self.processor(images=video_frames_np, return_tensors="pt")

            # Ekstraksi Fitur CLIP
            with torch.no_grad():
                batch = inputs['pixel_values'].to(self.device)
                outputs = self.vision_model(pixel_values=batch)
                zero_order = outputs.pooler_output.cpu().numpy()

            # Hitung Fitur Orde 1 & 2
=======
                raise ValueError("Video kosong atau tidak terbaca (tidak ada frame).")
            
            print(f"[INFO] Processing {len(frames)} frames in batches of {batch_size}...")

            # 2. Batch Processing untuk Ekstraksi Fitur CLIP
            # Kita TIDAK memproses semua frames sekaligus di GPU.
            zero_order_list = []
            
            with torch.no_grad():
                # Loop dari 0 sampai jumlah frame, dengan lompatan sebesar batch_size
                for i in range(0, len(frames), batch_size):
                    # Ambil chunk frame saat ini
                    batch_frames = frames[i : i + batch_size]
                    
                    # Preprocessing hanya batch ini
                    inputs = self.processor(images=batch_frames, return_tensors="pt")
                    batch = inputs['pixel_values'].to(self.device)
                    
                    # Inferensi hanya batch ini
                    outputs = self.vision_model(pixel_values=batch)
                    
                    # Pindahkan hasil ke CPU dan simpan
                    zero_order_list.append(outputs.pooler_output.cpu().numpy())
                    
                    # Opsional: Bersihkan cache jika GPU memory sangat sempit
                    if self.device.type == 'cuda': 
                        torch.cuda.empty_cache()

            # 3. Gabungkan hasil batch menjadi satu array
            zero_order = np.concatenate(zero_order_list, axis=0)

            # 4. Hitung Fitur Orde 1 & 2 (Temporal Features)
>>>>>>> Ver4
            first_order = self.calculate_first_order_features(zero_order)
            second_order = self.calculate_second_order_features(first_order)
            feature_vector = self.extract_feature_vector(second_order)

<<<<<<< HEAD
            # Persiapan Klasifikasi
            feature_names = ['std_dev', 'mean', 'max', 'min', 'skewness', 'kurtosis']
            features_df = np.array(feature_vector).reshape(1, -1)
            
            # Normalisasi menggunakan Scaler yang disimpan
            features_scaled = self.scaler.transform(features_df)

            # Prediksi LightGBM
            prediction_proba = self.lgbm_model.predict_proba(features_scaled)[0]
            predicted_class_idx = np.argmax(prediction_proba)
            confidence = float(prediction_proba[predicted_class_idx])

            # Mapping ke format response
            class_name = CLASSES[predicted_class_idx]
            description = DESCRIPTIONS[predicted_class_idx]
            
            # Kembalikan hasil
            return {
                "class_name": class_name,
                "description": description,
                "confidence": confidence,
                "metrics": {
                    # Catatan: Accuracy/F1 Score adalah metrik dataset, bukan per instance.
                    # Di sini kita kembalikan confidence sebagai metrik utama.
=======
            # 5. Persiapan Klasifikasi (LightGBM)
            features_df = np.array(feature_vector).reshape(1, -1)
            
            # Pastikan scaler ada
            if self.scaler is None:
                raise ValueError("Scaler not loaded.")
                
            features_scaled = self.scaler.transform(features_df)

            if self.lgbm_model is None:
                raise ValueError("Model LGBM not loaded.")

            # 6. Prediksi
            prediction_proba = self.lgbm_model.predict_proba(features_scaled)[0]
            predicted_class_idx = np.argmax(prediction_proba)

            # 7. Format Output
            confidence = float(prediction_proba[predicted_class_idx])
            class_name = CLASSES[predicted_class_idx]
            
            all_class_confidences = {}
            for idx, prob in enumerate(prediction_proba):
                all_class_confidences[CLASSES[idx]] = float(prob)

            return {
                "class_name": class_name,
                "confidence": confidence,
                "all_predictions": all_class_confidences,
                "metrics": {
>>>>>>> Ver4
                    "prediction_confidence": f"{confidence * 100:.2f}%"
                }
            }

        except Exception as e:
<<<<<<< HEAD
            print(f"Error during inference: {e}")
=======
            print(f"[ERROR] Inference failed: {e}")
            traceback.print_exc()
>>>>>>> Ver4
            raise e
        finally:
            cap.release()

    # --- ASYNC CONTROLLER ---
    async def process_video(self, video_bytes: bytes, filename: str) -> Dict[str, Any]:
        """
<<<<<<< HEAD
        Menerima bytes dari upload website, menyimpannya ke file temp,
        lalu menjalankan inferensi secara asinkron.
        """
        if self.lgbm_model is None:
            return {
                "error": "Model not loaded. Check server logs.",
                "details": "Model belum dimuat."
            }

        # 1. Buat file temporary untuk menyimpan video bytes
        # delete=False diperlukan karena cv2 di Windows kadang butuh akses eksklusif,
        # lalu kita hapus manual nanti.
        temp_file_path = None
        try:
=======
        Menerima bytes dari upload, simpan ke temp, jalankan inferensi non-blocking.
        """
        if not self.is_ready:
            return {
                "error": "Service Unavailable",
                "details": "Model belum selesai dimuat atau gagal load."
            }

        temp_file_path = None
        try:
            # Simpan bytes ke file temp (agar bisa dibaca cv2.VideoCapture)
>>>>>>> Ver4
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
                tmp_file.write(video_bytes)
                temp_file_path = tmp_file.name
            
<<<<<<< HEAD
            print(f"Processing video: {filename} (Saved to {temp_file_path})")

            # 2. Jalankan inferensi di thread terpisah (Non-blocking)
            # agar server FastAPI/Flask tetap merespon request lain.
=======
            print(f"[INFO] Processing video: {filename} (Temp: {temp_file_path})")

            # Jalankan inferensi di thread terpisah (biarkan loop event FastAPI jalan)
>>>>>>> Ver4
            result = await asyncio.to_thread(self._run_inference, temp_file_path)
            
            return result

        except Exception as e:
<<<<<<< HEAD
            print(f"Error processing video: {e}")
            return {
                "error": "Gagal memproses video.",
                "details": str(e)
            }
        finally:
            # 3. Hapus file temporary agar tidak penuh disk
=======
            print(f"[ERROR] Controller error: {e}")
            return {
                "error": "Internal Server Error",
                "details": str(e)
            }
        finally:
            # Hapus file temp
>>>>>>> Ver4
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.remove(temp_file_path)
                except Exception as e:
<<<<<<< HEAD
                    print(f"Warning: Gagal menghapus file temp {temp_file_path}: {e}")
=======
                    print(f"[WARNING] Gagal hapus temp file: {e}")

# --- FASTAPI APP SETUP ---
app = FastAPI(title="Deepfake Detection API")

# Inisialisasi Service Global (Load saat startup)
model_service = ModelService()

@app.get("/")
def health_check():
    return {
        "status": "running",
        "model_loaded": model_service.is_ready,
        "device": str(model_service.device)
    }

@app.post("/predict")
async def predict_video(file: UploadFile = File(...)):
    """
    Endpoint untuk upload video.
    Menerima file multipart/form-data dengan key 'file'.
    """
    try:
        # Baca konten file
        contents = await file.read()
        
        # Validasi ukuran file (Optional: Max 50MB)
        MAX_SIZE = 50 * 1024 * 1024
        if len(contents) > MAX_SIZE:
            raise HTTPException(status_code=413, detail="File terlalu besar (Max 50MB)")

        # Validasi tipe konten (Optional)
        if file.content_type not in ["video/mp4", "video/quicktime", "video/x-msvideo"]:
             # Biarkan lewat tapi peringatkan, atau strict return error
             pass

        # Jalankan processing
        result = await model_service.process_video(contents, file.filename)

        # Jika ada error di dalam result
        if "error" in result:
            return JSONResponse(status_code=500, content=result)

        return result

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Jalankan server
    uvicorn.run(app, host="0.0.0.0", port=8000)
>>>>>>> Ver4
