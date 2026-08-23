import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    host: true,
    proxy: {
      "/api": {
        // Override with BACKEND_URL env var; defaults to the LAN dev machine
        target: process.env.BACKEND_URL || "http://192.168.110.129:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
