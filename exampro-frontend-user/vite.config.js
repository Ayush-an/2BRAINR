import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3005,   // <-- Change this to any port you want
    host: true    // enables LAN access (optional)
  }
})
