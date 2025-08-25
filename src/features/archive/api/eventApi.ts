// src/features/archive/api/eventApi.ts
import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';
import { Event, CreateEventInput } from '@/app/types/event';

export const useEventApi = () => {
  const { getToken } = useAuth();

  const fetchEvents = async (activityId: string): Promise<Event[]> => {
    if (!activityId) {
      console.log('⚠️ activityId가 없어서 이벤트를 가져올 수 없습니다.');
      return [];
    }
    console.log(`🌐 이벤트 조회 시작: activityId = ${activityId}`);
    try {
      const response = await authRequest<Event[]>(
        getToken,
        'get',
        `/activities/${activityId}/events/`
      );

      console.log('📥 받아온 이벤트 데이터:', response);
      return response;
    } catch (error) {
      console.error('❌ 이벤트 조회 실패:', error);
      return [];
    }
  };

  const createEvent = async (activityId: string, data: CreateEventInput): Promise<Event> => {
    const response = await authRequest<Event>(
      getToken,
      'post',
      `/activities/${activityId}/events/`,
      data
    );
    console.log('event post 결과:', response);
    return response;
  };

  const deleteEvent = async (activityId: string, id: string): Promise<void> => {
    await authRequest(getToken, 'delete', `/activities/${activityId}/events/${id}/`);
  };

  const updateEvent = async (
    activityId: string,
    id: string,
    data: Partial<Event>
  ): Promise<void> => {
    await authRequest(getToken, 'patch', `/activities/${activityId}/events/${id}/`, data);
  };

  return {
    fetchEvents,
    createEvent,
    deleteEvent,
    updateEvent,
  };
};
