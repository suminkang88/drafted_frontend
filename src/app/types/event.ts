// 날짜 (period-string으로 표시) 제외 db 상 필요한 항목들 전체 반영

export interface File {
  id: string;
  name: string;
  url: string;
}

export interface Event {
  id: string;
  // activity: string; // 활동 id
  title: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  startDate?: string;
  endDate?: string;
  attachedFiles?: File[];
  createdAt?: Date; // 필요 시 수정
  updatedAt?: Date; // 필요 시 수정
  path?: string; // 필요 시 수정 (프론트 단에서만 활용)
}

export interface CreateEventInput {
  title: string;
  situation?: string;
  task?: string;
  startDate?: string;
  endDate?: string;
  action?: string;
  result?: string;
}
