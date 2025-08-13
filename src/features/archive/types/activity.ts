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
  recentEvents: string[];
  event_count: number;
};

//activities/{activity_id} activities_read(특정 활동의 상세정보 조회)
export type Activity = {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  role: string;
  description: string;
  keywords: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};
