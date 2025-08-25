// src/features/auth/api/userApi.ts
import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';

// 스웨거 스펙에 맞는 ProfileInfo 타입 정의
export interface ProfileInfo {
  name: string;
  university: string;
  major: string;
  graduation_year: number;
  field_of_interest: string;
}

export const useUserApi = () => {
  const { getToken } = useAuth();

  // 스웨거 스펙에 맞춰 /users/ 엔드포인트만 사용
  const createUser = async (data: any) => {
    console.log('createUser 호출됨');
    console.log('전송할 데이터:', data);
    console.log('엔드포인트: /users/');

    try {
      const result = await authRequest(getToken, 'post', '/users/', data);
      console.log('createUser 성공:', result);
      return result;
    } catch (error) {
      console.error('createUser 실패:', error);
      throw error;
    }
  };

  const fetchUser = (userId: string | number) => authRequest(getToken, 'get', `/users/${userId}/`);
  const updateUser = (userId: string | number, data: any) =>
    authRequest(getToken, 'put', `/users/${userId}/`, data);
  const deleteUser = (userId: string | number) =>
    authRequest(getToken, 'delete', `/users/${userId}/`);

  return { createUser, fetchUser, updateUser, deleteUser };
};
