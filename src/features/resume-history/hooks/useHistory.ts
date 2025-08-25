import { authRequest } from '@/axios/authRequest';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

export const useHistoryApi = () => {
  const { getToken } = useAuth();

  const fetchResumes = () => {
    console.log('fetchResumes 호출됨');

    return useQuery({
      queryKey: ['history'],
      queryFn: async () => {
        console.log('API 요청 시작: /applications/');
        try {
          const response = await authRequest(getToken, 'get', `/applications/`);
          console.log('✅ 이력서 목록 조회 성공:', response);
          return response;
        } catch (error) {
          console.error('❌ 이력서 목록 조회 실패:', error);
          throw error;
        }
      },
    });
  };

  const deleteResume = async (applicationId: string): Promise<void> => {
    const response = await authRequest(
      getToken,
      'delete',
      `/applications/${applicationId}/delete/`
    );
  };

  return {
    fetchResumes,
    deleteResume,
  };
};
