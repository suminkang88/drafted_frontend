export interface EditorGuideline {
  question_id: number; // 백엔드 응답 예시에 맞춤
  content: string; // markdown text
}

export type ChatRole = 'user' | 'assistant' | 'system' | string;

export interface CreateChatSessionPayload {
  title?: string;
  initial_message?: string;
  application_id: number;
  question_id: number;
}

export interface CreateChatSessionResponse {
  session_id: number;
  title: string;
  message: string;
}

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  created_at: string; // ISO datetime
}

export interface GetChatMessagesResponse {
  messages: ChatMessage[];
}

export interface SendChatMessagePayload {
  message: string;
  personal_statement?: string;
  question_id?: number;
}

export interface SendChatMessageResponse {
  user_message: {
    id: number;
    content: string;
    created_at: string;
  };
  ai_response: {
    id: number;
    content: string;
    created_at: string;
  };
}
