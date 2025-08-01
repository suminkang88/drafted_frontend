import React, { useState } from 'react';
import { SelectedActivityCard } from '@/shared/components';

interface ActivitySection {
  title: string;
  content: string;
}

interface ToggledSelectedActivityCardProps {
  event: string;
  activity: string;
  sections: ActivitySection[];
}

const ToggledSelectedActivityCard: React.FC<ToggledSelectedActivityCardProps> = ({
  event,
  activity,
  sections,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-xl border border-gray-300 font-noto">
      {/* 헤더: SelectedActivityCard 내부의 토글 아이콘 */}
      <SelectedActivityCard
        event={event}
        activity={activity}
        showClose={false}
        rightElement={
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <img
              src="/icons/toggle.svg"
              alt="toggle"
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        }
      />

      {/* 펼쳐지는 섹션 */}
      {isOpen && (
        <div className="bg-[#FFDBC7] px-4 pt-6 pb-5 rounded-b-xl space-y-4 text-sm text-gray-800">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-semibold mb-1">{section.title}</h2>
              <div className="bg-white p-3 rounded-md shadow-sm leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggledSelectedActivityCard;
