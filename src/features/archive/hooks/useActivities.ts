// src/features/archive/hooks/useActivities.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActivityApi } from '../api/activityApi';
import type { Activity } from '../types/activity';

export const useActivities = () => {
  const { fetchActivities } = useActivityApi();

  return useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
};

export const useActivity = (id: string | number) => {
  const { fetchActivityById } = useActivityApi();

  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => fetchActivityById(id),
    enabled: !!id,
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
