import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'window',
  },
  // server: {
  //   proxy: {
  //     '/openvidu': {
  //       target: 'https://openvidu.example.com:4443',
  //       changeOrigin: true,
  //       secure: false, // 개발 환경에서 SSL 인증서 오류를 피하기 위해 사용
  //       rewrite: (path) => path.replace(/^\/openvidu/, ''),
  //     },
  //   },
  // },
});
