import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepText from '@/features/resume-setup/components/StepText';
import InfoInputCard from '@/shared/components/InfoInputCard';

const categories = ['공모전', '대외활동', '동아리', '연구', '학회', '인턴십'];

const BasicInfoInputPage: React.FC = () => {
  const navigate = useNavigate();

  const [applyTo, setApplyTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleNextClick = () => {
    if (!applyTo || !dueDate || !category || !position) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    setError('');
    navigate('/resume/question');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <StepText step={1} description="기본 지원 정보 입력하기" />

        <div className="bg-[#E4E8EE] rounded-xl p-6 flex flex-col gap-6 w-full max-w-xl">
          <InfoInputCard
            label="어디에 지원하나요?"
            type="text"
            value={applyTo}
            placeholder="지원하려는 동아리, 학회, 회사명 등을 입력해주세요."
            onChange={setApplyTo}
            required
          />

          <InfoInputCard
            label="언제까지 지원해야 하나요?"
            type="date"
            value={dueDate}
            onChange={setDueDate}
            required
          />

          <InfoInputCard
            label="지원 카테고리를 선택해주세요"
            type="dropdown"
            value={category}
            onChange={setCategory}
            options={categories}
            required
          />

          <InfoInputCard
            label="어떤 포지션에 지원하나요?"
            type="text"
            value={position}
            placeholder="기획팀, 개발자, 마케터 등"
            onChange={setPosition}
            required
          />

          <InfoInputCard
            label="모집 공고 내용을 붙여넣어 주세요"
            type="textarea"
            value={description}
            placeholder="링크나 주요 안내문을 붙여넣어 주세요."
            onChange={setDescription}
            required={false}
          />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

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
