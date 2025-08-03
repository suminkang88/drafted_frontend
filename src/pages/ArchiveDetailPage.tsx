import React, { useState } from 'react';
import SideBar from '@/features/archive/components/SideBar';
import UndoButton from '@/shared/components/UndoButton';
import ActivityRecordCard from '@/shared/components/ActivityRecordCard';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';

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
  const [cards, setCards] = useState([0]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddCard = () => setCards((prev) => [...prev, prev.length]);
  const handleDeleteCard = () => setCards((prev) => prev.slice(0, -1));

  const handleAddKeyword = (kw: string) => setKeywords((prev) => [...prev, kw]);
  const handleRemoveKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  return (
    <div className="flex gap-16 px-12 py-10 bg-[#F8F9FA] min-h-screen">
      {/* 좌측 사이드바 */}
      <div className="w-[300px] flex flex-col gap-4">
        <UndoButton />
        <SideBar
          title="목차"
          activities={[
            { id: '1', title: '새내기 호 제작', path: '#' },
            { id: '2', title: '사설 프로세스 개선', path: '#' },
            { id: '3', title: '대학신문 소셜 미디어 계정 리브랜딩', path: '#' },
            { id: '4', title: '참가캠페인 유치', path: '#' },
          ]}
        />
      </div>

      {/* 우측 본문 */}
      <div className="flex-1 flex flex-col gap-14">
        {/* 제목 및 활동 기본 정보 */}
        <div className="space-y-8">
          <h1 className="text-[30pt] text-[#00193E] font-semibold">대학신문 편집장</h1>

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

        {/* 이벤트 제목과 카드 및 삭제/추가 버튼 */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[20pt] font-bold text-[#00193E]">이벤트 이름</h2>
            <DeleteOrAdd onAddClick={handleAddCard} onDeleteClick={handleDeleteCard} />
          </div>

          <div className="flex flex-col gap-4">
            {cards.map((id) => (
              <ActivityRecordCard key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDetailPage;
