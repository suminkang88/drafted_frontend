// 날짜 (period-string으로 표시) 제외 db 상 필요한 항목들 전체 반영

export interface Event {
  id: string;
  title: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  path: string; // 필요 시 수정 (프론트 단에서만 활용)
}
