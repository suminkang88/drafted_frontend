// src/features/archive/api/activityApi.ts
import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';

export const useActivityApi = () => {
  const { getToken } = useAuth();

  const fetchActivities = () => authRequest(getToken, 'get', '/api/activities/');

  const createActivity = (data: any) => authRequest(getToken, 'post', '/api/activities/', data);

  const fetchActivityById = (id: string | number) =>
    authRequest(getToken, 'get', `/api/activities/${id}/`);

  const updateActivity = (id: string | number, data: any) =>
    authRequest(getToken, 'put', `/api/activities/${id}/`, data);

  const partialUpdateActivity = (id: string | number, data: any) =>
    authRequest(getToken, 'patch', `/api/activities/${id}/`, data);

  const deleteActivity = (id: string | number) =>
    authRequest(getToken, 'delete', `/api/activities/${id}/`);

  return {
    fetchActivities,
    createActivity,
    fetchActivityById,
    updateActivity,
    partialUpdateActivity,
    deleteActivity,
  };
};
