import { BlackBgButton } from '@/shared/components';
import React from 'react';
import { activities } from './dummy';
import EventRecommendationCard from './EventRecommendationCard';

// 추천이벤트 받아오는 api 연결하기

interface Activity {
  id: string;
  title: string;
  institution: string;
  description?: string;
  isRecommended?: boolean;
  isSelected?: boolean;
}

interface SideBarProps {
  activities?: Activity[];
  onView?: (activityId: number) => void;
  onSelect?: (activityId: number) => void;
  onFindOtherActivities?: () => void;
  onAddDirectActivity?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  onView = () => {},
  onSelect = () => {},
  onFindOtherActivities = () => {},
  onAddDirectActivity = () => {},
}) => {
  return (
    <aside className="w-[530px] bg-[#E4E8EE] py-20 flex flex-col sticky top-0 h-screen overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-12 text-center">
        <h2 className="text-xl font-bold text-gray-800">1번 문항에 추천하는 활동이에요</h2>
      </div>

      {/* Activity Cards */}
      <div className="flex flex-col items-center gap-10">
        {activities.map((activity) => {
          return (
            <EventRecommendationCard
              key={activity.id}
              onSelect={onSelect}
              onView={onView}
              event={activity}
            />
          );
        })}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col gap-4 mt-8 items-center px-6 mb-6">
        <BlackBgButton
          onClick={onFindOtherActivities}
          textClassName="text-lg font-noto"
          innerText="다른 활동 찾아보기"
        />
        <BlackBgButton
          onClick={onAddDirectActivity}
          textClassName="text-lg font-noto"
          innerText="직접 활동 추가하기"
        />
      </div>
    </aside>
  );
};

export default SideBar;
