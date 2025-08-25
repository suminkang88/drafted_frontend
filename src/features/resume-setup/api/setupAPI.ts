// src/features/resume-setup/api/setupAPI.ts
import { useAuth } from '@clerk/clerk-react';
import { authRequest } from '@/axios/authRequest';

// 스웨거 스펙에 따른 타입 정의
export interface Question {
  description?: string;
  content: string;
  max_characters: number;
}

export interface ApplicationCreate {
  activity: string; // 지원서 제목 (필수)
  category: string; // 지원서 카테고리 (필수)
  endDate: string; // 지원서 마감일 (필수, date-time 형식)
  position: string; // 활동 역할 및 직책 (필수)
  notice?: string; // 모집공고 링크 또는 공고 내용 (선택)
  questions: Question[]; // 지원서 문항 목록 (필수)
}

export interface ApplicationCreateResponse {
  id: string; // 생성된 지원서 ID
}

export const useSetupApi = () => {
  const { getToken } = useAuth();

  // 지원서 생성 API (POST /applications/create/)
  const createApplication = async (data: ApplicationCreate): Promise<ApplicationCreateResponse> => {
    console.log('createApplication 호출됨');
    console.log('전송할 데이터:', data);
    console.log('엔드포인트: /applications/create/');

    try {
      const result = await authRequest<ApplicationCreateResponse>(
        getToken,
        'post',
        '/applications/create/',
        data
      );
      console.log('createApplication 성공:', result);
      return result;
    } catch (error) {
      console.error('createApplication 실패:', error);
      throw error;
    }
  };

  // 지원서 조회 API (GET /applications/{id}/)
  const fetchApplication = async (applicationId: string | number) => {
    console.log('fetchApplication 호출됨 - ID:', applicationId);
    try {
      const result = await authRequest(getToken, 'get', `/applications/${applicationId}/`);
      console.log('✅ fetchApplication 성공:', result);
      return result;
    } catch (error) {
      console.error('❌ fetchApplication 실패:', error);
      throw error;
    }
  };

  // 지원서 수정 API (PUT /applications/{id}/)
  const updateApplication = (applicationId: string | number, data: Partial<ApplicationCreate>) =>
    authRequest(getToken, 'put', `/applications/${applicationId}/`, data);

  // 지원서 삭제 API (DELETE /applications/{id}/)
  const deleteApplication = (applicationId: string | number) =>
    authRequest(getToken, 'delete', `/applications/${applicationId}/`);

  return {
    createApplication,
    fetchApplication,
    updateApplication,
    deleteApplication,
  };
};
