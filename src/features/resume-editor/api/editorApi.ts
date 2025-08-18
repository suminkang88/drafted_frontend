import { authRequest } from '@/axios/authRequest';
import type { EditorGuideline } from '@/features/resume-editor/types/editor';

// GET /applications/questions/{question_id}/editor-guideline/
export const fetchEditorGuideline = async (
  getToken: () => Promise<string | null | undefined>,
  questionId: number | string
): Promise<EditorGuideline> => {
  const getTokenSafe: () => Promise<string | null> = async () => {
    const t = await getToken?.();
    return t ?? null;
  };
  const { data } = await authRequest(
    getTokenSafe,
    'get',
    `/applications/questions/${questionId}/editor-guideline/`
  );
  return data;
};
