import React, { useState } from 'react';
import SideBar from '@/features/archive/components/SideBar';
import { UndoButton, ActivityRecordCard, DeleteOrAdd } from '@/shared/components';
import { useNavigate, useParams } from 'react-router-dom';
import { mockActivities as dummyData } from './dummy';

interface KeywordProps {
  keywords: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

const KeywordInput: React.FC<KeywordProps> = ({ keywords, onAdd, onRemove }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {keywords.map((kw, idx) => (
        <div
          key={idx}
          className="px-3 py-1 rounded-md bg-[#00193E] text-white text-sm flex items-center gap-1"
        >
          #{kw}
          <button onClick={() => onRemove(kw)} className="ml-1 text-xs">
            ×
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none text-[#00193E] text-[15pt] bg-[#F8F9FA]"
        placeholder="Enter keyword"
      />
    </div>
  );
};

const ArchiveDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // db 연결 시 아래 두 줄 수정
  const data = dummyData;
  const activity = data.find((a) => a.id === id);

  if (!activity) {
    return <div>존재하지 않는 활동입니다.</div>;
  }

  const [events, setEvents] = useState(activity.events);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddCard = () => setEvents((prev) => [...prev, prev.length]);
  const handleDeleteCard = () => setEvents((prev) => prev?.slice(0, -1));

  const handleAddKeyword = (kw: string) => setKeywords((prev) => [...prev, kw]);
  const handleRemoveKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  return (
    <div className="flex gap-16 px-12 py-10 bg-[#F8F9FA] min-h-screen">
      {/* 좌측 사이드바 */}
      <div className="w-[300px] flex flex-col gap-4">
        <UndoButton onClick={() => navigate('/archive')} />
        <SideBar title="목차" events={activity.events ?? []} />
      </div>

      {/* 우측 본문 */}
      <div className="flex-1 flex flex-col gap-14">
        {/* 제목 및 활동 기본 정보 */}
        <div className="space-y-8">
          <h1 className="text-[30pt] text-[#00193E] font-semibold">{activity.title}</h1>

          <div className="flex flex-col gap-4 text-[15pt] text-[#00193E]">
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">카테고리</p>
              <input className="flex-1 bg-[#F8F9FA]" placeholder="예: 교내 동아리" />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 기간</p>
              <input className="flex-1 bg-[#F8F9FA]" placeholder="예: 2023.06.01 ~ 2023.11.31" />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">역할</p>
              <input className="flex-1 bg-[#F8F9FA]" placeholder="예: 편집장" />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 설명</p>
              <input className="flex-1 bg-[#F8F9FA]" placeholder="예: 리더십, 사회문화 분석..." />
            </div>
            <div className="flex items-center gap-4">
              <p className="w-[150px] text-[#9B9DA1] font-semibold">활동 키워드</p>
              <KeywordInput
                keywords={keywords}
                onAdd={handleAddKeyword}
                onRemove={handleRemoveKeyword}
              />
            </div>
          </div>

          <hr className="border-[#9B9DA1] border-t-[1px] mt-6" />
        </div>

        {/* 카드 및 삭제/추가 버튼 */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-end items-center">
            <DeleteOrAdd onAddClick={handleAddCard} onDeleteClick={handleDeleteCard} />
          </div>

          <div className="flex flex-col gap-16">
            {events && events.length > 0 ? (
              events.map((event) => <ActivityRecordCard key={event.id} event={event} />)
            ) : (
              <ActivityRecordCard isEmpty />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetailPage;
