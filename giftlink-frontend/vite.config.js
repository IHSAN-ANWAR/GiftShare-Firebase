import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // remove server & proxy for production
  // base: '/',  // optional, default is fine
})
