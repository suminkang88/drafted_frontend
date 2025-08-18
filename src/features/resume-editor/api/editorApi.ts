import { authRequest } from '@/axios/authRequest';
import type {
  EditorGuideline,
  CreateChatSessionPayload,
  CreateChatSessionResponse,
  GetChatMessagesResponse,
  SendChatMessagePayload,
  SendChatMessageResponse,
} from '@/features/resume-editor/types/editor';

// 공통 토큰 세이프 헬퍼
const toSafe = (getToken?: () => Promise<string | null | undefined>) => async () => {
  const t = await getToken?.();
  return t ?? null;
};

/** (GET) /applications/questions/{question_id}/editor-guideline/ */
export const fetchEditorGuideline = async (
  getToken: () => Promise<string | null | undefined>,
  questionId: number | string
): Promise<EditorGuideline> => {
  const res = await authRequest<EditorGuideline>(
    toSafe(getToken),
    'get',
    `/applications/questions/${questionId}/editor-guideline/`
  );
  return res; // ✅ authRequest가 이미 data를 반환
};

/** (POST) /chat/sessions/ : 채팅 세션 생성 */
export const createChatSession = async (
  getToken: () => Promise<string | null | undefined>,
  payload: CreateChatSessionPayload
): Promise<CreateChatSessionResponse> => {
  const res = await authRequest<CreateChatSessionResponse>(
    toSafe(getToken),
    'post',
    '/chat/sessions/',
    payload
  );
  return res; // ✅ 그대로 반환
};

/** (GET) /chat/sessions/{session_id}/messages/ : 세션 메시지 목록 조회 */
export const getChatMessages = async (
  getToken: () => Promise<string | null | undefined>,
  sessionId: number | string
): Promise<GetChatMessagesResponse> => {
  const res = await authRequest<GetChatMessagesResponse>(
    toSafe(getToken),
    'get',
    `/chat/sessions/${sessionId}/messages/`
  );
  return res; // ✅ 그대로 반환
};

/** (POST) /chat/sessions/{session_id}/messages/ : 메시지 전송 + AI 응답 수신 */
export const sendChatMessage = async (
  getToken: () => Promise<string | null | undefined>,
  sessionId: number | string,
  payload: SendChatMessagePayload
): Promise<SendChatMessageResponse> => {
  const res = await authRequest<SendChatMessageResponse>(
    toSafe(getToken),
    'post',
    `/chat/sessions/${sessionId}/messages/`,
    payload
  );
  return res; // ✅ 그대로 반환
};
