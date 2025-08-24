import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",              // ensure correct asset paths
  build: {
    outDir: "dist",       // Vercel expects 'dist'
  },
})
