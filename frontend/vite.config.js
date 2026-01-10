import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Mengizinkan domain ngrok agar tidak muncul error "Host not allowed"
    allowedHosts: [
      'beautifully-transcondylar-kelley.ngrok-free.dev',
      '.ngrok-free.dev' // Mengizinkan semua subdomain ngrok
    ],
    // Penting: Memastikan Vite mendengarkan pada semua interface agar bisa diakses ngrok
    host: true, 
    strictPort: true,
  }
})