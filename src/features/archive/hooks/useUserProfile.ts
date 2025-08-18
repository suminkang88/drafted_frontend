// hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { useUserProfileApi } from '@/features/archive/api/userProfileApi';
import { ProfileInfo } from '../types/profileInfo';

export const useUserProfile = (user_id: string) => {
  const { fetchUserProfile } = useUserProfileApi();

  return useQuery<ProfileInfo>({
    queryKey: ['userProfile', user_id], // 캐싱 키
    queryFn: () => fetchUserProfile(user_id), // API 호출
    enabled: !!user_id, // userId 있을 때만 호출
  });
};
