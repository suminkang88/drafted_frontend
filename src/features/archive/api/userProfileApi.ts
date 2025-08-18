import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';
import { ProfileInfo } from '../types/profileInfo';

export const useUserProfileApi = () => {
  const { getToken } = useAuth();

  const fetchUserProfile = (user_id: string) => authRequest(getToken, 'get', `/users/${user_id}/`);

  return {
    fetchUserProfile,
  };
};
