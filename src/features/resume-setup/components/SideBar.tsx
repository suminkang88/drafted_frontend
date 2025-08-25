import { BlackBgButton } from '@/shared/components';
import React from 'react';
import EventRecommendationCard from './EventRecommendationCard';
import { useRecommendApi } from '../hooks/useRecommend';
import { useQuestionsContext } from '../QuestionsContext';

interface Event {
  id: number;
  title: string;
  activity: string;
  comment?: string;
  isRecommended?: boolean;
  isSelected?: boolean;
}

interface SideBarProps {
  selectedQuestionTab: number;
  selectedQuestionId: number;
  onView?: (eventId: number) => void;
  onFindOtherEvents?: () => void;
  onAddDirectEvent?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  selectedQuestionTab,
  selectedQuestionId,
  onView = () => {},
  onFindOtherEvents = () => {},
  onAddDirectEvent = () => {},
}) => {
  const { data, isLoading, isError, error } =
    selectedQuestionId > 0
      ? useRecommendApi().fetchRecommendEvents(selectedQuestionId)
      : { data: null, isLoading: false, isError: false, error: null };
  const recommendedEvents = data?.eventlist || [];

  const { questionsState, selectEvent } = useQuestionsContext();
  const qState = questionsState[selectedQuestionId];

  return (
    <aside className="w-[530px] bg-[#E4E8EE] py-20 flex flex-col sticky top-0 h-screen overflow-y-auto">
      {/* Header */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="font-noto font-semibold text-[#00193E]">
            AI 추천 활동을 불러오고 있습니다...
          </div>
        </div>
      ) : (
        <>
          <div className="px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedQuestionTab}번 문항에 추천하는 활동이에요
            </h2>
          </div>

          <div className="flex flex-col items-center gap-10">
            {recommendedEvents.map((event: Event) => {
              return (
                <EventRecommendationCard
                  key={event.id}
                  questionId={selectedQuestionId}
                  onSelect={() => selectEvent(selectedQuestionId, event)}
                  onView={onView}
                  event={event}
                />
              );
            })}
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-col gap-4 mt-8 items-center px-6 mb-6">
            <BlackBgButton
              onClick={onFindOtherEvents}
              textClassName="text-lg font-noto"
              innerText="다른 활동 찾아보기"
            />
            <BlackBgButton
              onClick={onAddDirectEvent}
              textClassName="text-lg font-noto"
              innerText="직접 활동 추가하기"
            />
          </div>
        </>
      )}
    </aside>
  );
};

export default SideBar;
