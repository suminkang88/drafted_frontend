import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

//https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.drafty.site', // 실제 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
