import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "HPCG-Portfolio-Website",  // <-- replace with your GitHub repo name
})
