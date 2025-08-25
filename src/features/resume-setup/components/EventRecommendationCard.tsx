import { BlackBgButton, GrayBgButton } from '@/shared/components';
import React from 'react';
import { useQuestionsContext } from '../QuestionsContext';

interface Event {
  id: number;
  title: string;
  activity: string;
  comment?: string;
  isRecommended?: boolean;
  isSelected?: boolean;
}

interface EventRecommendationCardProps {
  event: Event;
  questionId?: number; // 현재 문항 ID 추가
  onView?: (eventId: number) => void;
  onSelect?: (eventId: number) => void;
}

const EventRecommendationCard: React.FC<EventRecommendationCardProps> = ({
  event,
  questionId,
  onView = () => {},
  onSelect = () => {},
}) => {
  const { questionsState } = useQuestionsContext();

  // 현재 문항에서 이 이벤트가 선택되었는지 확인
  const isSelectedInCurrentQuestion = questionId
    ? questionsState[questionId]?.status === 'selected' &&
      questionsState[questionId]?.event?.id === event.id
    : false;
  return (
    <>
      <div
        key={event.id}
        className={`w-full max-w-[462px] h-auto min-h-[190px] p-4 relative bg-white rounded-[10px] shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[#9b9da0]`}
      >
        {/* AI Recommendation Badge */}
        {event.isRecommended && (
          <div className="w-auto min-w-[100px] max-w-[127px] absolute left-4 top-[-14px] bg-[#ffb38a] rounded-[10px] px-2 py-1 flex justify-center items-center gap-1">
            <span className="text-center text-black text-sm font-semibold font-noto">
              ⭐️AI 추천⭐
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="pt-4 text-[#00193e] text-xl font-semibold font-noto">{event.title}</h3>

        {/* institution */}
        <p className="pt-2 mb-3 text-[#9b9da0] text-base font-semibold font-noto">
          {event.activity}
        </p>

        {/* Description - only for cards with description */}
        {event.comment && (
          <>
            <div className="w-full h-[1px] border-t border-[#9b9da0] mb-3"></div>
            <div className="w-full">
              <p className="text-[#00193e] text-sm font-noto leading-6 whitespace-pre-line">
                {event.comment}
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end gap-2">
          <GrayBgButton
            onClick={() => onView(event.id)}
            className="w-16 h-7"
            textClassName="text-xs font-semibold font-noto"
            innerText="보기"
          />

          {/* Select Button */}
          {isSelectedInCurrentQuestion ? (
            <BlackBgButton
              onClick={() => onSelect(event.id)}
              className="w-16 h-7"
              textClassName="text-xs font-semibold font-noto"
              innerText="선택"
            />
          ) : (
            <GrayBgButton
              onClick={() => onSelect(event.id)}
              className="w-16 h-7"
              textClassName="text-xs font-semibold font-noto"
              innerText="선택"
            />
          )}
        </div>

        {/* ⬇ 선택되었을 경우 하단 메시지 표시 */}
        {isSelectedInCurrentQuestion && (
          <p className="absolute bottom-3 left-4 text-xs text-[#9b9da0] font-noto">
            이미 선택된 활동입니다
          </p>
        )}
      </div>
    </>
  );
};

export default EventRecommendationCard;
