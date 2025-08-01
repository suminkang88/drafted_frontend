import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepText from '@/features/resume-setup/components/StepText';

const categories = ['공모전', '대외활동', '동아리', '연구', '학회', '인턴십'];

const BasicInfoInputPage: React.FC = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [applyTo, setApplyTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');

  const handleNextClick = () => {
    // 유효성 검사
    if (!applyTo || !dueDate || !category || !position) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    // TODO: form 저장 및 전역 상태 연동 필요

    setError('');
    navigate('/resume/question');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <StepText step={1} description="기본 지원 정보 입력하기" />

        {/* 입력 카드 */}
        <div className="bg-[#E4E8EE] rounded-xl p-6 flex flex-col gap-6 w-full max-w-xl">
          <div className="flex flex-col">
            <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
              어디에 지원하나요?
            </label>
            <input
              value={applyTo}
              onChange={(e) => setApplyTo(e.target.value)}
              className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium placeholder-[#9B9DA1]"
              placeholder="지원하려는 동아리, 학회, 회사명 등을 입력해주세요."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
              언제까지 지원해야 하나요?
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium text-black"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
              지원 카테고리를 선택해주세요
            </label>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium flex justify-between items-center"
            >
              <span className={category ? 'text-black' : 'text-[#9B9DA1]'}>
                {category || '선택해주세요'}
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
                      setCategory(cat);
                      setShowDropdown(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
              어떤 포지션에 지원하나요?
            </label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium placeholder-[#9B9DA1]"
              placeholder="기획팀, 개발자, 마케터 등"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#00193E] font-semibold text-[18px] mb-[10px]">
              모집 공고 내용을 붙여넣어 주세요
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white rounded-[10px] px-4 py-[10px] text-[15px] font-medium placeholder-[#9B9DA1] min-h-[120px] resize-none"
              placeholder="링크나 주요 안내문을 붙여넣어 주세요."
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* 다음 버튼 */}
        <button
          className="mt-10 px-6 py-2 rounded-md bg-[#E4E8EE] text-[#00193E] text-[16px] font-display 
            transition-colors hover:bg-[#00193E] hover:text-[#E4E8EE]"
          onClick={handleNextClick}
        >
          다음 →
        </button>
      </div>
    </div>
  );
};

export default BasicInfoInputPage;
