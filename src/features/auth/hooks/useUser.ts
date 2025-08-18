// src/features/auth/hooks/useUser.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUser, updateUser, deleteUser } from '../api/userApi';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUser = (userId: string | number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = (userId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
