// src/features/archive/types/activity.ts

//activities/ activities_list(사용자의 전체 활동 리스트를 조회)
export type ActivityRecord = {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  lastVisit: string;
  isFavorite: boolean;
  recentEvents: { id: number; event_name: string }[];
  event_count: number;
};

//activities/{activity_id} activities_read(특정 활동의 상세정보 조회)
export type Activity = {
  id: number;
  title: string;
  category: string;
  start_date: string;
  end_date: string;
  role: string;
  description: string;
  keywords: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  path?: string; // Event 타입과 호환성을 위해 추가
  events?: Activity[]; // 중첩된 이벤트 목록
};
