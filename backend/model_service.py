import os
import time
import random
import asyncio
import tempfile
import shutil
from typing import Dict, Any
# Library untuk Machine Vision dan Model
import cv2
import numpy as np
import torch
from scipy.stats import skew, kurtosis
from transformers import CLIPImageProcessor, CLIPVisionModel
import joblib

# Label dan Deskripsi
CLASSES = ["Deepfake Generated", "Real Video"] # Sesuaikan urutan: 0=AI, 1=Real
DESCRIPTIONS = [
    "Video ini memiliki anomali visual yang mengindikasikan bahwa ini adalah hasil generasi AI (Deepfake).",
    "Video ini terdeteksi asli dan tidak menunjukkan tanda-tanda manipulasi AI."
]

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

    # --- LOGIKA UTAMA INFERENSI (BERJALAN DI THREAD TERpisah) ---
    def _run_inference(self, video_path: str) -> Dict[str, Any]:
        """
        Fungsi blocking ini berisi logika berat (PyTorch + LightGBM).
        Dipanggil oleh asyncio.to_thread agar tidak memblokir server.
        """
        cap = cv2.VideoCapture(video_path)
        target_fps = 8

        try:
            if not cap.isOpened():
                raise ValueError("Gagal membuka video.")
            
            fps = cap.get(cv2.CAP_PROP_FPS)
            if fps == 0: fps = 30 # Fallback default
            frame_interval = max(1, int(round(fps / target_fps)))
            frames = []
            frame_idx = 0

            # Baca frame
            while True:
                ret, frame = cap.read()
                if not ret: break
                if frame_idx % frame_interval == 0:
                    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                    frames.append(frame_rgb)
                frame_idx += 1
            
            if not frames:
                raise ValueError("Video kosong atau tidak terbaca.")
            
            video_frames_np = np.stack(frames)
            inputs = self.processor(images=video_frames_np, return_tensors="pt")

            # Ekstraksi Fitur CLIP
            with torch.no_grad():
                batch = inputs['pixel_values'].to(self.device)
                outputs = self.vision_model(pixel_values=batch)
                zero_order = outputs.pooler_output.cpu().numpy()

            # Hitung Fitur Orde 1 & 2
            first_order = self.calculate_first_order_features(zero_order)
            second_order = self.calculate_second_order_features(first_order)
            feature_vector = self.extract_feature_vector(second_order)

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
                    "prediction_confidence": f"{confidence * 100:.2f}%"
                }
            }

        except Exception as e:
            print(f"Error during inference: {e}")
            raise e
        finally:
            cap.release()

    # --- ASYNC CONTROLLER ---
    async def process_video(self, video_bytes: bytes, filename: str) -> Dict[str, Any]:
        """
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
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
                tmp_file.write(video_bytes)
                temp_file_path = tmp_file.name
            
            print(f"Processing video: {filename} (Saved to {temp_file_path})")

            # 2. Jalankan inferensi di thread terpisah (Non-blocking)
            # agar server FastAPI/Flask tetap merespon request lain.
            result = await asyncio.to_thread(self._run_inference, temp_file_path)
            
            return result

        except Exception as e:
            print(f"Error processing video: {e}")
            return {
                "error": "Gagal memproses video.",
                "details": str(e)
            }
        finally:
            # 3. Hapus file temporary agar tidak penuh disk
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.remove(temp_file_path)
                except Exception as e:
                    print(f"Warning: Gagal menghapus file temp {temp_file_path}: {e}")
