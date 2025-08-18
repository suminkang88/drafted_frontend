// src/features/archive/hooks/useActivities.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActivityApi } from '../api/activityApi';
import type { Activity } from '@/app/types/activity';

export const useActivities = () => {
  const { fetchActivities } = useActivityApi();

  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await fetchActivities();

      // 백엔드에서 받은 데이터를 프론트엔드 타입으로 정규화
      const normalizedActivities =
        response.activities?.map((rawActivity: any) => ({
          id: rawActivity.id?.toString() || '',
          title: rawActivity.title || rawActivity.activity_name || '',
          category: rawActivity.category || '',
          startDate: rawActivity.startDate || rawActivity.start_date || '',
          endDate: rawActivity.endDate || rawActivity.end_date || '',
          eventCount: rawActivity.event_count || rawActivity.eventCount || 0,
          isFavorite: rawActivity.isFavorite || rawActivity.favorite || false,
          createdAt: rawActivity.createdAt || rawActivity.created_at || '',
          updatedAt: rawActivity.updatedAt || rawActivity.updated_at || '',
          events: rawActivity.events || [],
        })) || [];

      console.log('🔄 원본 activities 데이터:', response);
      console.log('✅ 정규화된 데이터:', normalizedActivities);

      return {
        ...response,
        activities: normalizedActivities,
      };
    },
  });
};

export const useActivity = (id: string | number, p0: { enabled: boolean }) => {
  const { fetchActivityById } = useActivityApi();
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      const response = await fetchActivityById(id);

      // 백엔드에서 배열로 반환되는 경우 첫 번째 요소 추출
      const rawActivity = Array.isArray(response) ? response[0] : response;

      if (!rawActivity) {
        throw new Error('Activity not found');
      }

      // 필드명 매핑 및 데이터 정규화 - 백엔드 필드명 우선 사용
      const normalizedActivity: Activity = {
        id: rawActivity.id?.toString() || '',
        title: rawActivity.activity_name || '', // activity_name만 사용
        category: rawActivity.category || '',
        startDate: rawActivity.start_date || '', // start_date만 사용
        endDate: rawActivity.end_date || '', // end_date만 사용
        role: rawActivity.position || '', // position만 사용
        description: rawActivity.description || '',
        keywords: rawActivity.keywords || '',
        eventCount: rawActivity.event_count || 0, // event_count만 사용
        isFavorite: rawActivity.favorite || false, // favorite만 사용
        createdAt: rawActivity.created_at || '', // created_at만 사용
        updatedAt: rawActivity.updated_at || '', // updated_at만 사용
        events: rawActivity.events || [],
      };

      console.log('🔄 원본 데이터:', rawActivity);
      console.log('✅ 정규화된 데이터:', normalizedActivity);

      return normalizedActivity;
    },
    enabled: !!id && p0.enabled,
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  const { createActivity } = useActivityApi();

  return useMutation({
    mutationFn: async (newActivity: Partial<Activity>) => {
      return await createActivity(newActivity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

export const usePartialUpdateActivity = () => {
  const queryClient = useQueryClient();
  const { partialUpdateActivity } = useActivityApi();

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
  const { deleteActivity } = useActivityApi();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};
