// src/features/resume-editor/ResumeEditPage.tsx
import React, { useMemo, useState } from 'react';
import {
  AIResponseCard,
  AutoSaved,
  ChatInput,
  ContentInputBox,
  DragContentCard,
  ToggledSelectedActivityCard,
  UserResponseCard,
} from './components';
import { useDebounceSave } from './components';
import {
  ApplicationTitle,
  GuideLineCard,
  QuestionSelectButton,
  QuestionShowCard,
} from '@/shared/components';
import {
  useCreateChatSession,
  useChatMessages,
  useSendChatMessage,
} from '@/features/resume-editor/hooks/useEditor';

interface ActivityDetailSection {
  title: string;
  content: string;
}

const dummySections: ActivityDetailSection[] = [
  { title: '활동 요약', content: '연말부터 8주간 서비스기획 직무 관련 국비지원 프로그램 수료...' },
  {
    title: '나의 활동 및 개선',
    content: '‘지그재그’ 커머스 플랫폼의 커뮤니티 기능을 개선하는 파일럿 프로젝트...',
  },
  { title: '결과 및 성과', content: '긍정적인 피드백, PM 직무에 대한 이해도 제고...' },
];

const ResumeEditPage = () => {
  const [text, setText] = useState('');
  const { status, lastSaved } = useDebounceSave(text, 1000);

  const [dragText, setDragText] = useState('');
  const [chatText, setChatText] = useState('');
  const [sessionId, setSessionId] = useState<number | string | null>(null);

  const questionId = 4;

  const createSession = useCreateChatSession();
  const msgsQuery = useChatMessages(sessionId ?? undefined);
  const sendMutation = useSendChatMessage();

  const serverThread = useMemo(() => {
    if (!msgsQuery.data?.messages) return [];
    return msgsQuery.data.messages.map((m) =>
      m.role === 'assistant'
        ? { type: 'assistant' as const, content: m.content }
        : { type: 'user' as const, content: m.content }
    );
  }, [msgsQuery.data]);

  const handleSubmit = async (plain: string) => {
    const trimmed = plain.trim();
    if (!trimmed && !dragText.trim()) return;

    let sid = sessionId;

    // 1) 세션 없으면 생성
    if (!sid) {
      const created = await createSession.mutateAsync({
        application_id: 1,
        question_id: Number(questionId),
        title: '자기소개서 에디터',
      });
      console.log(created.session_id);

      // created가 { data: {...} } 인 경우 처리
      sid = created?.session_id ?? created?.data?.session_id;

      if (!sid) {
        console.error('세션 생성 응답에 session_id가 없습니다.', created);
        return;
      }
      setSessionId(sid);
    }

    // 2) 메시지 전송
    const combinedMessage = dragText
      ? `<<선택 텍스트>>\n${dragText}\n\n<<요청>>\n${trimmed}`
      : trimmed;

    await sendMutation.mutateAsync({
      sessionId: sid!,
      payload: {
        message: combinedMessage,
        personal_statement: text,
        question_id: Number(questionId),
      },
    });

    setDragText('');
    setChatText('');
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* 좌측 */}
      <div className="w-[1200px] p-6 bg-white border-r border-gray-200">
        <div className="flex justify-between items-end w-full">
          <ApplicationTitle targetName={'멋쟁이 사자처럼 13기'} />
          <AutoSaved status={status} lastSaved={lastSaved} />
        </div>

        <QuestionSelectButton
          className="flex justify-end"
          questionNumbers={4}
          extraLabel="전체 보기"
        />

        <div className="mb-4">
          <QuestionShowCard question="멋쟁이사자처럼 13기에 지원한 동기를 적어주세요" />
        </div>

        <div className="mb-4">
          <ToggledSelectedActivityCard
            event="서비스기획 동아리"
            activity="프로젝트 기획 및 실행"
            sections={dummySections}
          />
        </div>

        <ContentInputBox text={text} setText={setText} onTextDrag={setDragText} />
      </div>

      {/* 우측 */}
      <div className="flex flex-col p-6 flex-1">
        <div>
          <GuideLineCard questionId={questionId} />
        </div>
        <div className="flex flex-col justify-end h-full">
          {/* 메시지 스레드 */}
          <div className="flex flex-col items-end space-y-4 overflow-y-auto max-h-[300px] pr-2 mb-4">
            {serverThread.map((m, i) =>
              m.type === 'assistant' ? (
                <AIResponseCard key={`srv-${i}`} content={m.content} />
              ) : (
                <UserResponseCard key={`srv-${i}`} content={m.content} />
              )
            )}
            {/* 닫기 시 dragText 초기화 */}
            {dragText && <DragContentCard content={dragText} onClose={() => setDragText('')} />}
          </div>

          {/* 입력창 */}
          <div className="mt-auto">
            <ChatInput
              text={chatText}
              setText={setChatText}
              onSubmit={handleSubmit}
              disabled={createSession.isPending || sendMutation.isPending}
            />
            {(createSession.isError || sendMutation.isError) && (
              <p className="mt-2 text-sm text-red-600">
                채팅 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditPage;
