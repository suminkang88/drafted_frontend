import {
  GuideLineCard,
  QuestionShowCard,
  QuestionSelectButton,
  GrayBgButton,
  BlackBgButton,
} from '@/shared/components';
import { StepText, SideBar, EventSelectionBlock } from './components';
import ActivityAddModal from './components/Modal/ActivityAddModal';
import ActivitySearchModal from './components/Modal/ActivitySearchModal';
import { useState } from 'react';
import { useQuestionsContext } from './QuestionsContext';
import { useRecommendApi } from './hooks/useRecommend';
import { useNavigate, useParams } from 'react-router-dom';

// 필요한 데이터만 추출한 타입 정의
export interface Question {
  questionId: number;
  questionOrder: string;
  content: string;
  limit: number;
}

const ActivityRecommendationInner = ({ questions }: { questions: Question[] }) => {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  // api 로 받아온 문항 내용(정적자료): questions
  // 문항 별 선택 및 이벤트 상태: questionsState (context 사용)
  const [isActivitySearchModalOpen, setIsActivitySearchModalOpen] = useState(false);
  const [isActivityAddModalOpen, setIsActivityAddModalOpen] = useState(false);
  const [selectedQuestionTab, setSelectedQuestionTab] = useState<number>(0);

  // 지원서 문항 목록 상태 관리
  const { questionsState, selectLater } = useQuestionsContext();
  const { postRecommendEvent } = useRecommendApi();
  // 문항 탭 선택 핸들러
  const handleQuestionTabClick = (tabNumber: number) => {
    setSelectedQuestionTab(tabNumber);
  };

  // 문항들을 선택된 탭에 따라 정렬
  const sortedQuestions = questions.sort((a, b) => {
    const aOrder = parseInt(a.questionOrder);
    const bOrder = parseInt(b.questionOrder);

    // 선택된 탭의 문항을 맨 위로
    if (aOrder === selectedQuestionTab + 1) return -1;
    if (bOrder === selectedQuestionTab + 1) return 1;

    // 나머지는 순서대로
    return aOrder - bOrder;
  });

  const handleFindOtherActivities = () => {
    setIsActivitySearchModalOpen(true);
  };

  const handleCloseActivityAddModal = () => {
    setIsActivityAddModalOpen(false);
  };

  const handleAddDirectActivity = () => {
    setIsActivityAddModalOpen(true);
  };

  const handleCloseActivitySearchModal = () => {
    setIsActivitySearchModalOpen(false);
  };

  const handleSelectionSubmit = () => {
    const data = Object.entries(questionsState).map(([qId, qState]) => {
      if (qState.status === 'selected') {
        console.log(qState.event.id);
        return { question: Number(qId), event: qState.event.id };
      }
      // none, later → event 없음
      return { question: Number(qId) };
    });
    postRecommendEvent.mutate(data, {
      onSuccess: () => {
        navigate(`/resume/${resumeId}/editor`);
      },
    });
  };

  return (
    <div className="flex">
      {/* Main Content Area */}
      <div className="flex-1 px-8 flex flex-col m-10">
        <StepText step={3} description="지원서 구조화하기" />
        <QuestionSelectButton
          questionNumbers={questions.length}
          className="bg-[#E4E8EE] flex sticky top-0 justify-center"
          selectedTab={selectedQuestionTab}
          onClick={handleQuestionTabClick}
        />

        <div className="mt-10 flex flex-col gap-4">
          {/* 선택된 문항과 가이드라인, 선택 블록 */}
          {sortedQuestions.map((question) => {
            const isSelected = parseInt(question.questionOrder) === selectedQuestionTab + 1;

            if (isSelected) {
              return (
                <div key={question.questionId} className="flex flex-col gap-4">
                  <h3 className="text-[22px] text-[#00193E] font-bold text-[#FFB38A]">
                    문항 {question.questionOrder} (선택됨)
                  </h3>
                  <QuestionShowCard
                    question={question.content}
                    maximumTextLength={question.limit}
                  />
                  <GuideLineCard questionId={question.questionId} editOrRecommend="recommend" />

                  <div className="flex flex-col items-end gap-2.5 relative">
                    <EventSelectionBlock qId={question.questionId} mode="current" />

                    <GrayBgButton
                      innerText="나중에 선택할래요"
                      className="w-[135px] h-[31px]"
                      onClick={() => selectLater(question.questionId)}
                    />
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* 나머지 문항들 (하단에 표시) */}
          <div className="mt-8">
            <h4 className="text-lg text-[#00193E] font-semibold mb-4">다른 문항들</h4>
            {sortedQuestions.map((question) => {
              const isSelected = parseInt(question.questionOrder) === selectedQuestionTab + 1;

              if (!isSelected) {
                return (
                  <div key={question.questionId} className="flex flex-col gap-4 mb-6">
                    <h3 className="text-[18px] text-[#00193E] font-bold">
                      문항 {question.questionOrder}
                    </h3>
                    <QuestionShowCard
                      question={question.content}
                      maximumTextLength={question.limit}
                    />

                    {/* 선택된 상태라면 주황색 이벤트 블록 표시 */}
                    <EventSelectionBlock qId={question.questionId} mode="other" />
                  </div>
                );
              }

              return null;
            })}
          </div>
          <div className="flex justify-center">
            <BlackBgButton
              innerText="지원서 작성 시작하기"
              className="w-[230px] h-[40px]"
              textClassName="text-[16px] font-semibold"
              onClick={handleSelectionSubmit}
            />
          </div>
        </div>
      </div>

      <SideBar
        selectedQuestionTab={selectedQuestionTab + 1}
        selectedQuestionId={
          questions.find((q) => parseInt(q.questionOrder) === selectedQuestionTab + 1)
            ?.questionId || 0
        }
        onFindOtherEvents={handleFindOtherActivities}
        onAddDirectEvent={handleAddDirectActivity}
      />

      {isActivitySearchModalOpen && (
        <ActivitySearchModal onClose={handleCloseActivitySearchModal} />
      )}

      {isActivityAddModalOpen && <ActivityAddModal onClose={handleCloseActivityAddModal} />}
    </div>
  );
};

export default ActivityRecommendationInner;
