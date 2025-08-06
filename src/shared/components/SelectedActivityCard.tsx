import React from 'react';

interface SelectedActivityCardProps {
  event: string;
  activity: string;
  onClose?: () => void;
  showClose?: boolean; // 추가
  rightElement?: React.ReactNode; // 오른쪽 요소를 자유롭게 삽입할 수 있도록
}

const SelectedActivityCard: React.FC<SelectedActivityCardProps> = ({
  event,
  activity,
  onClose,
  showClose = true,
  rightElement,
}) => {
  // console.log('🔍 event:', event);
  // console.log('🔍 activity:', activity);
  const bgColor = event === '무선택' ? 'bg-[#F2F2F2]' : 'bg-[#FFB38A]';

  return (
    <div
      className={`flex items-center justify-between ${bgColor} rounded-[10px] border border-[#9B9DA1] border-[0.5px] px-6 py-4 w-auto max-w-full`}
    >
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

      <div className="ml-2">
        {rightElement ? (
          rightElement
        ) : showClose ? (
          <button>
            <img src="/icons/delete2.svg" alt="close" className="w-5 h-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SelectedActivityCard;
