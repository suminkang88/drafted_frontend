import { BlackBgButton } from '@/shared/components';
import React from 'react';
import { activities } from './dummy';
import EventRecommendationCard from './EventRecommendationCard';

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
    <aside className="w-[530px] mx-auto bg-[#E4E8EE] py-20 flex flex-col">
      {/* Activity Cards */}
      <div className="flex flex-col items-center gap-10">
        {activities.map((activity) => {
          return (
            <EventRecommendationCard
              key={activity.id}
              onSelect={onSelect}
              onView={onView}
              activity={activity}
            />
          );
        })}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col gap-4 mt-[72px] items-center">
        <BlackBgButton
          onClick={onFindOtherActivities}
          textClassName="text-xl font-noto"
          innerText="다른 활동 찾아보기"
        />
        <BlackBgButton
          onClick={onAddDirectActivity}
          textClassName="text-xl font-noto"
          innerText="직접 활동 추가하기"
        />
      </div>
    </aside>
  );
};

export default SideBar;
