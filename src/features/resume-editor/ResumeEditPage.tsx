// src/features/resume-editor/ResumeEditPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
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
  useSuggestion,
} from '@/features/resume-editor/hooks/useEditor';
import { useSetupApi } from '../resume-setup/api/setupAPI';
import { useParams, useLocation } from 'react-router-dom';
import { Question } from '@/app/types';

//////////여기부터

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
/////////여기까지 주석

const ResumeEditPage = () => {
  const { id: resumeId } = useParams<{ id: string }>();
  const location = useLocation();
  const { fetchApplication } = useSetupApi();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 지원서 문항 로딩 상태 관리
  const [error, setError] = useState<string | null>(null);

  // location.state에서 지원서 제목 전달받음
  const passedData = location.state as {
    title?: string;
  } | null;

  // 지원서 문항 가져오기
  useEffect(() => {
    const loadApplicationQuestions = async () => {
      if (!resumeId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchApplication(resumeId);
        console.log('fetchApplication 응답:', result);
        setQuestions(result);
      } catch (err) {
        console.error('지원서 문항 로딩 실패:', err);
        setError('지원서 문항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadApplicationQuestions();
  }, [resumeId]);

  const [texts, setTexts] = useState<{ [key: number]: string }>({});
  const [selectedQuestionTab, setSelectedQuestionTab] = useState<number>(0);
  const [dragText, setDragText] = useState('');
  const [chatText, setChatText] = useState('');
  const [sessionId, setSessionId] = useState<number | string | null>(null);

  // 선택된 질문의 questionId 찾기
  const selectedQuestion = questions.find(
    (q) => parseInt(q.questionOrder) === selectedQuestionTab + 1
  );
  const selectedQuestionId = selectedQuestion?.questionId || 0;

  const {
    data: selectedSuggestions,
    isLoading: isLoadingSuggestions,
    isFetching: isFetchingSuggestions,
    refetch: refetchSuggestions,
  } = useSuggestion(!isLoading && selectedQuestionId > 0 ? selectedQuestionId : 0);
  const suggested = selectedSuggestions?.suggestions?.[0];

  // selectedQuestionId가 바뀔 때마다 useSuggestion API 재요청 (지원서 로딩 완료 후에만)
  useEffect(() => {
    if (selectedQuestionId > 0 && !isLoading) {
      refetchSuggestions();
    }
  }, [selectedQuestionId, refetchSuggestions, isLoading]);

  const questionId = selectedQuestionId;

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

      sid = created?.session_id; // ?? created?.data?.session_id;

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
        personal_statement: texts[selectedQuestionId] || '',
        question_id: Number(questionId),
      },
    });

    setDragText('');
    setChatText('');
  };

  const handleQuestionTabClick = (tabNumber: number) => {
    setSelectedQuestionTab(tabNumber);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* 좌측 */}
      <div className="flex-1 px-8 bg-white border-r border-gray-200">
        {isLoading ? (
          <div className="flex justify-center items-center text-center font-noto font-semibold h-screen">
            지원서를 불러오는 중입니다...
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end w-full">
              <ApplicationTitle targetName={passedData?.title || '멋쟁이 사자처럼 13기'} />
            </div>

            <QuestionSelectButton
              className="flex justify-end bg-white"
              questionNumbers={questions.length}
              extraLabel="전체 보기"
              selectedTab={selectedQuestionTab}
              onClick={handleQuestionTabClick}
            />

            <div className="mb-4">
              {questions.map((question) => {
                const isSelected = parseInt(question.questionOrder) === selectedQuestionTab + 1;

                if (isSelected) {
                  return (
                    <div key={question.questionId} className="flex flex-col gap-4 mb-4">
                      <QuestionShowCard
                        question={question.content}
                        maximumTextLength={question.limit}
                      />
                      {isLoadingSuggestions || isFetchingSuggestions ? (
                        <div className="flex justify-center items-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <ToggledSelectedActivityCard
                            event={suggested?.event_name || '이벤트 없음'}
                            activity={suggested?.activity || '활동 없음'}
                            sections={dummySections}
                          />
                          <ContentInputBox
                            text={texts[question.questionId] || ''}
                            limit={question.limit}
                            setText={(newText) =>
                              setTexts((prev) => ({ ...prev, [question.questionId]: newText }))
                            }
                            onTextDrag={setDragText}
                          />
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </>
        )}
      </div>

      {/* 우측 */}
      <div className="flex flex-col p-6 min-w-[500px] w-[500px]">
        <div>
          <GuideLineCard
            questionId={!isLoading && questionId > 0 ? questionId : 0}
            editOrRecommend="edit"
          />
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
            {dragText && <DragContentCard content={dragText} />}
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
