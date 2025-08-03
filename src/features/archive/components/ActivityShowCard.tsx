import React, { useState } from 'react';
import GrayBgButton from '@/shared/components/GrayBgButton';

interface ActivityShowCardProps {
  id: string;
  title: string;
  type: string;
  period: string;
  highlights: string[];
  eventCount: number;
  isFavorite?: boolean;
}

const ActivityShowCard: React.FC<ActivityShowCardProps> = ({
  id,
  title,
  type,
  period,
  highlights = [],
  eventCount,
  isFavorite = false,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  return (
    <div className="w-[280px] h-[300px] p-5 bg-white rounded-[15px] shadow-md border border-[#C6CBD1] relative flex flex-col justify-between">
      {/* 즐겨찾기 아이콘 */}
      <img
        src={favorite ? '/icons/star_filled.svg' : '/icons/star_empty.svg'}
        alt="즐겨찾기"
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 w-5 h-5 cursor-pointer transition-opacity hover:opacity-80"
      />

      {/* 상단 정보 */}
      <div>
        {/* 제목: 글자간격 줄이고 2줄까지 노출 */}
        <h3 className="text-[18pt] font-bold text-[#00193E] tracking-tight leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-[12pt] font-semibold text-[#9B9DA1]">{type}</p>
        <p className="text-[12pt] font-semibold text-[#9B9DA1] mb-3">{period}</p>
        <hr className="border-[#C6CBD1] mb-3" />

        {/* 하이라이트: 최대 3개, 각 항목은 한 줄로 잘림 */}
        <ul className="text-[#00193E] text-[12pt] font-medium space-y-1">
          {highlights.slice(0, 3).map((item, index) => (
            <li key={index} className="line-clamp-1">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 고정 영역 */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-[11pt] font-semibold text-[#9B9DA1]">외 {eventCount}개의 이벤트</span>
        <GrayBgButton onClick={() => console.log('보기 클릭됨')} />
      </div>
    </div>
  );
};

export default ActivityShowCard;
