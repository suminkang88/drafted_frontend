import React from 'react';

interface SelectedActivityCardProps {
  event: string;
  activity: string;
  onClose?: () => void;
}

const SelectedActivityCard: React.FC<SelectedActivityCardProps> = ({
  event,
  activity,
  onClose,
}) => {
  console.log('🔍 event:', event);
  console.log('🔍 activity:', activity);

  return (
    <div className="flex items-center justify-between bg-[#FFB38A] rounded-[10px] border border-[#9B9DA1] border-[0.5px] px-6 py-4 w-auto max-w-full">
      {/* 왼쪽 텍스트: 따로 스타일 적용 */}
      <div className="flex items-center gap-2 flex-shrink min-w-0">
        <p className="font-noto text-[#00193E] text-[20px] font-semibold leading-snug break-keep">
          {event}
        </p>
        <p className="font-noto text-[#00193E] text-[16px] font-normal leading-snug break-keep">
          {activity}
        </p>
      </div>

      {/* X 버튼 */}
      <button onClick={onClose} className="group flex-shrink-0 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#9B9DA1] group-hover:text-[#00193E] transition-colors duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SelectedActivityCard;
