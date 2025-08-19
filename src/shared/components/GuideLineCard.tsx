//일단 문항 작성 (활동 추천 x) 가이드라인만 적용했습니다..!
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useEditorGuideline } from '@/features/resume-editor/hooks/useEditor';

interface GuideLineCardProps {
  /** 문항 ID가 있으면 API로 가이드라인을 조회합니다. */
  questionId?: number | string;
  /** questionId가 없거나, 에러/빈 응답일 때 표시할 기본 텍스트 */
  text?: string;
  className?: string;
}

const GuideLineCard: React.FC<GuideLineCardProps> = ({
  questionId,
  text = '가이드라인이 없습니다.',
  className,
}) => {
  console.log('[GuideLineCard] questionId:', questionId);
  // questionId가 있을 때만 네트워크 호출
  const { data, isLoading, isError, error } = useEditorGuideline(questionId);

  console.log('[GuideLineCard] useEditor state:', {
    isLoading,
    isError,
    data,
    error,
  });

  // 표시할 내용 결정: 로딩 → 에러 → API 데이터 → fallback text
  let contentToShow = text;

  if (questionId) {
    if (isLoading) {
      contentToShow = '가이드라인을 불러오는 중입니다...';
    } else if (isError) {
      contentToShow = text || '가이드라인을 불러오는 데 실패했습니다.';
    } else if (data?.content) {
      contentToShow = data.content;
    } else {
      contentToShow = text || '가이드라인이 비어 있습니다.';
    }
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#9B9DA1] border-opacity-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg p-5">
      <div className="text-[#000000] font-noto font-bold text-lg flex items-center mb-3">
        📍 이렇게 작성해보세요
      </div>
      <hr className="border-[#9B9DA1] mb-3" />
      <div className="font-noto text-[#000000] text-base whitespace-pre-line">
        <ReactMarkdown>{contentToShow}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GuideLineCard;
