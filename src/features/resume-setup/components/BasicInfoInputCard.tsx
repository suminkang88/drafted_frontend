import React, { useState } from 'react';

const categories = ['공모전', '대외활동', '동아리', '연구', '학회', '인턴십'];

const labelStyle = 'text-[#00193E] font-semibold text-[18px] mb-[10px]';
const inputBaseStyle = 'w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium';

const BasicInfoInputCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [date, setDate] = useState('');

  return (
    <div className="bg-[#E4E8EE] rounded-xl p-6 flex flex-col gap-6 w-full max-w-xl">
      {/* 어디에 지원하나요? */}
      <div className="flex flex-col">
        <label className={labelStyle}>어디에 지원하나요?</label>
        <input
          className={`${inputBaseStyle} placeholder-[#9B9DA1] text-black`}
          placeholder="지원하려는 동아리, 학회, 회사명 등을 입력해주세요."
        />
      </div>

      {/* 언제까지 지원해야 하나요? */}
      <div className="flex flex-col">
        <label className={labelStyle}>언제까지 지원해야 하나요?</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="연도. 월. 일."
          className={`w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium ${
            date ? 'text-black' : 'text-[#9B9DA1]'
          }`}
        />
      </div>

      {/* 지원 카테고리 선택 */}
      <div className="relative flex flex-col">
        <label className={labelStyle}>지원 카테고리를 선택해주세요</label>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className={`${inputBaseStyle} flex justify-between items-center`}
        >
          <span className={selectedCategory ? 'text-black' : 'text-[#9B9DA1]'}>
            {selectedCategory}
          </span>
          <img src="/icons/toggle.svg" alt="dropdown toggle" className="w-5 h-5" />
        </button>
        {showDropdown && (
          <ul className="absolute z-10 mt-2 w-full bg-white rounded-[10px] shadow-md">
            {categories.map((cat) => (
              <li
                key={cat}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[15px] text-black"
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowDropdown(false);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 어떤 포지션에 지원하나요? */}
      <div className="flex flex-col">
        <label className={labelStyle}>어떤 포지션에 지원하나요?</label>
        <input
          className={`${inputBaseStyle} placeholder-[#9B9DA1] text-black`}
          placeholder="기획팀, 개발자, 마케터 등"
        />
      </div>

      {/* 모집 공고 내용 */}
      <div className="flex flex-col">
        <label className={labelStyle}>모집 공고 내용을 붙여넣어 주세요</label>
        <textarea
          className={`${inputBaseStyle} min-h-[120px] resize-none placeholder-[#9B9DA1] text-black`}
          placeholder="링크나 주요 안내문을 붙여넣어 주세요."
        />
      </div>
    </div>
  );
};

export default BasicInfoInputCard;
