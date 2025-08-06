// src/features/auth/api/userApi.ts
import axios from '@/axios/axios';

export const createUser = async (data: any) => {
  const response = await axios.post('/users/', data);
  return response.data;
};

export const fetchUser = async (userId: string | number) => {
  const response = await axios.get(`/users/${userId}/`);
  return response.data;
};

export const updateUser = async (userId: string | number, data: any) => {
  const response = await axios.put(`/users/${userId}/`, data);
  return response.data;
};

export const deleteUser = async (userId: string | number) => {
  const response = await axios.delete(`/users/${userId}/`);
  return response.data;
};
