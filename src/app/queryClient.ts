// src/app/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커싱 시 refetch 여부
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 1000 * 60 * 5, // 데이터 신선도 유지 시간 (5분)
    },
  },
});

export default queryClient;
