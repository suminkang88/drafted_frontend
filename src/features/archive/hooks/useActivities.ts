// src/features/archive/hooks/useActivities.ts
/*존재 이유:
 axios.get('/activities/') 같은 코드를 컴포넌트에 직접 쓸 필요가 없으며, 
 에러나 로딩 처리 자동화가 가능함
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchActivities,
  fetchActivityById,
  createActivity,
  updateActivity,
  partialUpdateActivity,
  deleteActivity,
} from '../api/activityApi';
import type { Activity } from '../types/activity';
import axios from '@/api/axios';

export const useActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
};

export const useActivity = (id: string | number) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => fetchActivityById(id),
    enabled: !!id, // id가 있을 때만 fetch
  });
};

//mutation(): 서버에 무언가 변경하는 요청을 보낼 때 사용 + 작업 상태 자동관리
export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newActivity: Partial<Activity>) => {
      const response = await axios.post('/activities/', newActivity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

export const usePartialUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      partialUpdateActivity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity'] });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};
