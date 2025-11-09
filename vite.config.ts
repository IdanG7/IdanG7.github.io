import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for react and dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Framer Motion in separate chunk (it's large)
          'framer': ['framer-motion'],
          // UI components chunk
          'ui': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-tooltip'],
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Minify for production using esbuild (faster than terser)
    minify: 'esbuild',
    target: 'esnext',
  },
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
});
