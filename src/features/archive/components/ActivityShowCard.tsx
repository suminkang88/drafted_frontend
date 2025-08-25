import React from 'react';
import { useNavigate } from 'react-router-dom';
import GrayBgButton from '@/shared/components/GrayBgButton';

interface ActivityShowCardProps {
  id: number;
  title: string;
  category: string;
  period: string;
  recentEvents: { id: number; event_name: string }[] | null;
  event_count: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number, isFavorite: boolean) => void;
}

const ActivityShowCard: React.FC<ActivityShowCardProps> = ({
  id,
  title,
  category,
  period,
  recentEvents = [],
  event_count,
  isFavorite = false,
  isSelected = false,
  onSelect,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(id, isFavorite); // ✅ 부모에 현재 값 전달 → API 호출
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/archive/${id}`);
  };

  const highlights: string[] = Array.isArray(recentEvents)
    ? recentEvents.map((ev) => ev.event_name).filter(Boolean)
    : [];

  return (
    <div
      onClick={() => onSelect(id.toString())}
      className={`w-[280px] h-[300px] p-5 bg-white rounded-[15px] shadow-md border relative flex flex-col justify-between
      ${isSelected ? 'border-black' : 'border-[#C6CBD1]'}`}
    >
      {/* 즐겨찾기 아이콘 */}
      <img
        src={isFavorite ? '/icons/star_filled.svg' : '/icons/star_empty.svg'}
        alt="즐겨찾기"
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 w-5 h-5 cursor-pointer transition-opacity hover:opacity-80"
      />

      {/* 상단 정보 */}
      <div>
        <h3 className="text-[18pt] font-bold text-[#00193E] tracking-tight leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-[12pt] font-semibold text-[#9B9DA1]">{category}</p>
        <p className="text-[12pt] font-semibold text-[#9B9DA1] mb-3">{period}</p>
        <hr className="border-[#C6CBD1] mb-3" />

        <ul className="text-[#00193E] text-[12pt] font-medium space-y-1">
          {highlights.length > 0 ? (
            highlights.slice(0, 3).map((text, idx) => (
              <li key={idx} className="line-clamp-1">
                {text}
              </li>
            ))
          ) : (
            <li className="text-[#9B9DA1]">이벤트 없음</li>
          )}
        </ul>
      </div>

      {/* 하단 고정 영역 */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-[11pt] font-semibold text-[#9B9DA1]">
          외 {event_count}개의 이벤트
        </span>
        <div onClick={handleView}>
          <GrayBgButton />
        </div>
      </div>
    </div>
  );
};

export default ActivityShowCard;
