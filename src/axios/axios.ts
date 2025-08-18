// src/api/axios.ts
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Clerk 토큰을 외부에서 주입받는 요청 래퍼
export const authRequest = async <T = any>(
  // getToken: () = Promise<string | null>, // 🔄 getToken을 인자로 받음
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any
): Promise<T> => {
  const { getToken } = useAuth();
  const token = await getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await instance.request<T>({
    method,
    url,
    data,
    headers,
    withCredentials: true,
  });

  return response.data;
};

export default instance;
