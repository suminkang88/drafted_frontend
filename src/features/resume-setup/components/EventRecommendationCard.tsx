import { BlackBgButton, GrayBgButton } from '@/shared/components';
import React from 'react';
import { activities } from './dummy';

interface Activity {
  id: number;
  title: string;
  institution: string;
  description?: string;
  isRecommended?: boolean;
  isSelected?: boolean;
}

interface EventRecommendationCardProps {
  activity: Activity;
  onView?: (activityId: number) => void;
  onSelect?: (activityId: number) => void;
}

const EventRecommendationCard: React.FC<EventRecommendationCardProps> = ({
  activity,
  onView = () => {},
  onSelect = () => {},
}) => {
  return (
    <>
      <div
        key={activity.id}
        className={`w-[462px] h-auto min-h-[190px] p-5 relative bg-white rounded-[10px] shadow-[3px_4px_4px_0px_rgba(0,0,0,0.25)] border border-[#9b9da0]`}
      >
        {/* AI Recommendation Badge */}
        {activity.isRecommended && (
          <div className="w-[127px] absolute left-5 top-[-14px] bg-[#ffb38a] rounded-[10px] px-[5px] py-[5px] flex justify-center items-center gap-[5px]">
            <span className="text-center text-black text-base font-semibold font-noto">
              ⭐️AI 추천⭐
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="pt-5 text-[#00193e] text-2xl font-semibold font-noto"
          // className="absolute left-[22px] top-[40px] text-[#00193e] text-2xl font-semibold font-noto">
        >
          {activity.title}
        </h3>

        {/* institution */}
        <p className="pt-2 mb-4 text-[#9b9da0] text-lg font-semibold font-noto">
          {activity.institution}
        </p>

        {/* Description - only for cards with description */}
        {activity.description && (
          <>
            <div className="w-[434px] h-[1px] border-t border-[#9b9da0] mb-4"></div>
            <div className=" w-[421px]">
              <p className="text-[#00193e] text-[17px] font-noto leading-[27px] whitespace-pre-line">
                {activity.description}
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="pt-5 flex justify-end gap-[8px]">
          <GrayBgButton
            onClick={() => onView(activity.id)}
            className="w-20 h-7"
            textClassName="text-[13px] font-semibold font-noto"
            innerText="보기"
          />

          {/* Select Button */}
          {activity.isSelected ? (
            <BlackBgButton
              onClick={() => onSelect(activity.id)}
              className="w-20 h-7"
              textClassName="text-[13px] font-semibold font-noto"
              innerText="선택"
            />
          ) : (
            <GrayBgButton
              onClick={() => onSelect(activity.id)}
              className="w-20 h-7"
              textClassName="text-[13px] font-semibold font-noto"
              innerText="선택"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EventRecommendationCard;
