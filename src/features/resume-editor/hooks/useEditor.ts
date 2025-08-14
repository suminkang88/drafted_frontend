// src/features/resume-editor/hooks/useEditor.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { fetchEditorGuideline } from '@/features/resume-editor/api/editorApi';
import type { EditorGuideline } from '@/features/resume-editor/types/editor';

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
    queryFn: () => fetchEditorGuideline(getToken, questionId!), // ⬅️ 위에서 safe 래핑
    enabled,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
