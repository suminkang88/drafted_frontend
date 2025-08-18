import { Event } from './event';
// 날짜 (period-string으로 표시) 제외 db 상 필요한 항목들 전체 반영
export interface Activity {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  role?: string;
  description?: string;
  keywords?: string;
  eventCount?: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  events?: Event[];
}
