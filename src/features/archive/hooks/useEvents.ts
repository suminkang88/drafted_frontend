import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEventApi } from '@/features/archive/api/eventApi';
import { Event, CreateEventInput } from '@/app/types';

const key = (activityId: string) => ['events', activityId];

export const useEvents = (activityId: string) => {
  const eventApi = useEventApi();
  return useQuery({
    queryKey: key(activityId),
    queryFn: async () => {
      console.log('🚀 useEvents queryFn 실행:', activityId);
      const events = await eventApi.fetchEvents(activityId);
      return events;
    },
    enabled: !!activityId, // activityId가 있을 때만 쿼리 실행
  });
};

export const useCreateEvent = (activityId: string) => {
  const queryClient = useQueryClient();
  const eventApi = useEventApi();

  return useMutation({
    mutationFn: (payload: CreateEventInput) => eventApi.createEvent(activityId, payload),

    onMutate: async (payload) => {
      // 이전 데이터 백업
      const prev = queryClient.getQueryData<Event[]>(key(activityId)) ?? [];

      // 임시 이벤트 생성
      const tempId = `temp-${Date.now()}`;
      const draft: Event = {
        id: tempId,
        title: payload.title ?? '',
        createdAt: new Date(),
      };

      // 임시 이벤트를 맨 위에 추가
      queryClient.setQueryData<Event[]>(key(activityId), [draft, ...prev]);

      // 롤백/치환용 컨텍스트 반환
      return { prev, tempId };
    },

    // 실패 시 롤백
    onError: (_err, _payload, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(key(activityId), ctx.prev);
      }
    },

    // 성공 시 임시카드 → 서버 응답으로 치환
    onSuccess: (created, _payload, ctx) => {
      if (ctx?.tempId) {
        queryClient.setQueryData<Event[]>(key(activityId), (curr = []) =>
          curr.map((e) => (e.id === ctx.tempId ? created : e))
        );
      }
    },

    // 완료 후 쿼리 무효화 (선택사항)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key(activityId) });
    },
  });
};

export const useDeleteEvent = (activityId: string) => {
  const queryClient = useQueryClient();
  const eventApi = useEventApi();

  return useMutation({
    mutationFn: (eventId: string) => eventApi.deleteEvent(activityId, eventId),

    onMutate: async (eventId) => {
      // 이전 데이터 백업
      const prev = queryClient.getQueryData<Event[]>(key(activityId)) ?? [];

      // 삭제할 이벤트를 제외한 목록으로 업데이트
      queryClient.setQueryData<Event[]>(key(activityId), (curr = []) =>
        curr.filter((e) => e.id !== eventId)
      );

      // 롤백용 컨텍스트 반환
      return { prev };
    },

    // 실패 시 롤백
    onError: (_err, _eventId, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(key(activityId), ctx.prev);
      }
    },

    // 성공 시 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key(activityId) });
    },
  });
};
