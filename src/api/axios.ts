// src/api/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경변수로 관리
  withCredentials: true, // 쿠키 기반 인증 시 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
