// src/features/archive/types/activity.ts
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
  events?: ActivityRecord[];
};

export interface ActivityRecord {
  id: string;
  title: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  path: string;
} // Add this line to match
