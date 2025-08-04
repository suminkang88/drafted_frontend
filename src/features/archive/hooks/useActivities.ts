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

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const useUpdateActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateActivity(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const usePartialUpdateActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => partialUpdateActivity(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });
};
