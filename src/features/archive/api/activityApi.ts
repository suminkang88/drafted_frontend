// src/features/archive/api/activityApi.ts
import axios from '@/api/axios';

export const fetchActivities = async () => {
  const response = await axios.get('/activities/');
  return response.data;
};

export const createActivity = async (data: any) => {
  const response = await axios.post('/activities/', data);
  return response.data;
};

export const fetchActivityById = async (id: string | number) => {
  const response = await axios.get(`/activities/${id}/`);
  return response.data;
};

export const updateActivity = async (id: string | number, data: any) => {
  const response = await axios.put(`/activities/${id}/`, data);
  return response.data;
};

export const partialUpdateActivity = async (id: string | number, data: any) => {
  const response = await axios.patch(`/activities/${id}/`, data);
  return response.data;
};

export const deleteActivity = async (id: string | number) => {
  const response = await axios.delete(`/activities/${id}/`);
  return response.data;
};
