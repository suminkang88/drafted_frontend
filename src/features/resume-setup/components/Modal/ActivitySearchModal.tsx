import React, { useState } from 'react';
import { SearchBar, SortingBar } from '@/shared/components';
import { GrayBgButton } from '@/shared/components';

interface ActivitySearchModalProps {
  onClose: () => void;
}

interface EventData {
  id: number;
  title: string;
  type: string;
  date: string;
}

const dummyEvents: EventData[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `EVENT ${i + 1}`,
  type: 'activity',
  date: 'DATE(YYYY.MM.DD)',
}));

const sortOptions = ['최신순', '기여도 높은 순'];
const ITEMS_PER_PAGE = 5;

const ActivitySearchModal: React.FC<ActivitySearchModalProps> = ({ onClose }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = dummyEvents.filter((event) =>
    event.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentPageEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[960px] bg-[#F8F9FA] rounded-2xl shadow-xl p-8 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* 검색창 */}
        <div className="mb-4 w-full">
          <SearchBar value={searchValue} onChange={setSearchValue} />
        </div>

        {/* 정렬 바 */}
        <div className="mb-4">
          <SortingBar selected={selectedSort} onSelect={setSelectedSort} options={sortOptions} />
        </div>

        <div className="font-noto divide-y divide-gray-200 border-t border-b">
          {currentPageEvents.map(({ id, title, type, date }) => (
            <div key={id} className="flex justify-between items-start py-[14px]">
              {/* 왼쪽: EVENT 제목 */}
              <div className="text-[#00193E] font-bold text-sm pt-1">{title}</div>

              {/* 오른쪽: activity + date + 버튼들 */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">{type}</span>
                <span className="text-gray-400 text-sm">{date}</span>
                <GrayBgButton innerText="보기" className="w-[44px] h-[30px] text-[13px]" />
                <GrayBgButton innerText="삭제" className="w-[44px] h-[30px] text-[13px]" />
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center mt-8 space-x-2 text-sm text-gray-500">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                currentPage === i + 1 ? 'text-black font-bold' : ''
              }`}
            >
              {currentPage === i + 1 ? '●' : i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySearchModal;
