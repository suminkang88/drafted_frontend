// src/features/resume-editor/hooks/useEditor.ts
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import {
  fetchEditorGuideline,
  createChatSession,
  getChatMessages,
  sendChatMessage,
} from '@/features/resume-editor/api/editorApi';
import type {
  EditorGuideline,
  CreateChatSessionPayload,
  CreateChatSessionResponse,
  GetChatMessagesResponse,
  SendChatMessagePayload,
  SendChatMessageResponse,
  ChatMessage,
} from '@/features/resume-editor/types/editor';

// ===================== Editor Guideline =====================
export const editorKeys = {
  all: ['editor-guideline'] as const,
  detail: (qid: number | string) => [...editorKeys.all, qid] as const,
};

type QK = ReturnType<typeof editorKeys.detail>;
type Opts = Omit<
  UseQueryOptions<EditorGuideline, unknown, EditorGuideline, QK>,
  'queryKey' | 'queryFn' | 'enabled'
>;

export function useEditorGuideline(questionId?: number | string, options?: Opts) {
  const { getToken } = useAuth();
  const enabled = !!questionId;

  return useQuery<EditorGuideline, unknown, EditorGuideline, QK>({
    queryKey: editorKeys.detail(questionId ?? 'unknown'),
    queryFn: () => fetchEditorGuideline(getToken, questionId!), // safe 내부 처리
    enabled,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

// ===================== Chat Keys =====================
export const chatKeys = {
  all: ['chat'] as const,
  session: (sid: number | string) => [...chatKeys.all, 'session', sid] as const,
  messages: (sid: number | string) => [...chatKeys.session(sid), 'messages'] as const,
};

// ===================== Create Chat Session (POST /chat/sessions/) =====================
type CreateSessionOpts = UseMutationOptions<
  CreateChatSessionResponse,
  unknown,
  CreateChatSessionPayload,
  unknown
>;

export function useCreateChatSession(options?: CreateSessionOpts) {
  const { getToken } = useAuth();

  return useMutation<CreateChatSessionResponse, unknown, CreateChatSessionPayload>({
    mutationFn: (payload) => createChatSession(getToken, payload),
    ...options,
  });
}

// ===================== Get Chat Messages (GET /chat/sessions/{id}/messages/) =====================
type MsgsQOpts = Omit<
  UseQueryOptions<
    GetChatMessagesResponse,
    unknown,
    GetChatMessagesResponse,
    ReturnType<typeof chatKeys.messages>
  >,
  'queryKey' | 'queryFn' | 'enabled'
>;

export function useChatMessages(sessionId?: number | string, options?: MsgsQOpts) {
  const { getToken } = useAuth();
  const enabled = !!sessionId;

  return useQuery<
    GetChatMessagesResponse,
    unknown,
    GetChatMessagesResponse,
    ReturnType<typeof chatKeys.messages>
  >({
    queryKey: chatKeys.messages(sessionId ?? 'unknown'),
    queryFn: () => getChatMessages(getToken, sessionId!),
    enabled,
    staleTime: 30 * 1000,
    ...options,
  });
}

// ===================== Send Chat Message (POST /chat/sessions/{id}/messages/) =====================
type SendMsgOpts = UseMutationOptions<
  SendChatMessageResponse,
  unknown,
  { sessionId: number | string; payload: SendChatMessagePayload },
  unknown
>;

export function useSendChatMessage(options?: SendMsgOpts) {
  const { getToken } = useAuth();
  const qc = useQueryClient();

  return useMutation<
    SendChatMessageResponse,
    unknown,
    { sessionId: number | string; payload: SendChatMessagePayload }
  >({
    mutationFn: ({ sessionId, payload }) => sendChatMessage(getToken, sessionId, payload),
    onSuccess: (res, vars) => {
      // 메시지 목록 쿼리 최신화 (가볍게 병합)
      const key = chatKeys.messages(vars.sessionId);
      qc.setQueryData<GetChatMessagesResponse>(key, (prev) => {
        const prevList: ChatMessage[] = prev?.messages ?? [];
        const merged: ChatMessage[] = [
          ...prevList,
          {
            id: res.user_message.id,
            role: 'user',
            content: res.user_message.content,
            created_at: res.user_message.created_at,
          },
          {
            id: res.ai_response.id,
            role: 'assistant',
            content: res.ai_response.content,
            created_at: res.ai_response.created_at,
          },
        ];
        return { messages: merged };
      });
    },
    ...options,
  });
}
