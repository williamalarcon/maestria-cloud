import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Permitir acceso desde cualquier IP
    port: 3000,       // Asegurar que use el puerto 3000
    strictPort: true, // Evitar que cambie de puerto
  },
  preview: {
    host: "0.0.0.0",
    port: 3000
  }
});
