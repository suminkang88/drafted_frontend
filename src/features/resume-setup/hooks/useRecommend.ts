import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

// api 호출 및 useQuery 활용을 모두 hook 안에서 처리함.

export const useRecommendApi = () => {
  const { getToken } = useAuth();

  // (GET) applications/questions/{question_id}/guideline/
  // 문항 별 활동 가이드라인 받아오기
  const fetchGuideline = (questionId: number) => {
    return useQuery({
      queryKey: ['guideline', questionId],
      queryFn: async () =>
        await authRequest(getToken, 'get', `/applications/questions/${questionId}/guideline/`),
    });
  };

  // (GET) applications/questions/{question_id}/recommend/
  // 문항 별 추천활동 받아오기
  const fetchRecommendEvents = (questionId: number) => {
    return useQuery({
      queryKey: ['recommend-activities', questionId],
      queryFn: async () => {
        try {
          const result = await authRequest(
            getToken,
            'get',
            `/applications/questions/${questionId}/recommend/`
          );
          console.log('fetchRecommendEvents API 호출 성공:', result);
          return result;
        } catch (error) {
          console.error('fetchRecommendEvents 에러:', error);
          throw error;
        }
      },
      enabled: questionId > 0, // questionId가 0보다 클 때만 쿼리 실행
    });
  };

  const postRecommendEvent = useMutation({
    mutationFn: async (data: { question: number; event?: number }[]) => {
      try {
        console.log('postRecommendEvent 호출됨, data:', data);
        const result = await authRequest(getToken, 'post', `/ai/questions/suggestions/`, data);
        console.log('API 호출 성공:', result);
        return result;
      } catch (error) {
        console.error('postRecommendEvent 에러:', error);
        throw error;
      }
    },
  });

  return {
    fetchGuideline,
    fetchRecommendEvents,
    postRecommendEvent,
  };
};
