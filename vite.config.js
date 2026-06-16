import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// AJ Connect — desktop-first dark SaaS dashboard
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
})
