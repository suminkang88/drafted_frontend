import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepText from '@/features/resume-setup/components/StepText';
import InfoInputCard from '@/shared/components/InfoInputCard';
import BlackBgButton from '@/shared/components/BlackBgButton';

// 카테고리를 가나다순으로 정렬하고 기타 옵션 추가
const categories = ['공모전', '대외활동', '동아리', '연구', '인턴십', '학회', '기타'];

const BasicInfoInputPage: React.FC = () => {
  const navigate = useNavigate();

  const [applyTo, setApplyTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 페이지 로드 시 이전 데이터 정리
  useEffect(() => {
    // 세션 스토리지 정리
    sessionStorage.removeItem('currentApplicationId');
    sessionStorage.removeItem('applicationData');
    sessionStorage.removeItem('basicInfoInputData');
    sessionStorage.removeItem('resumeSetupSessionId');
    sessionStorage.removeItem('tempApplication_basicInfo');

    // 로컬 스토리지 정리 (혹시 남아있을 수 있는 데이터)
    localStorage.removeItem('currentApplicationId');
    localStorage.removeItem('applicationData');
    localStorage.removeItem('basicInfoInputData');

    console.log('새 지원서 작성 시작 - 이전 데이터 정리 완료');
  }, []);

  const handleNextClick = async () => {
    if (!applyTo || !dueDate || !category || !position) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 1. 기본 정보를 sessionStorage에 임시 저장
      const basicInfoData = {
        applyTo,
        dueDate: new Date(dueDate).toISOString(),
        category,
        position,
        description,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem('tempApplication_basicInfo', JSON.stringify(basicInfoData));
      console.log('기본 정보 임시 저장 완료:', basicInfoData);

      // 2. API 호출 없이 바로 다음 페이지로 이동
      navigate('/resume/question-input');
    } catch (error: any) {
      console.error('기본 정보 저장 실패:', error);
      setError('기본 정보 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <StepText step={1} description="기본 지원 정보 입력하기" />

        <div className="bg-[#E4E8EE] rounded-xl p-6 flex flex-col gap-4 w-full max-w-xl">
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

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* 다음 버튼 */}
        <div className="flex justify-center mt-8">
          <BlackBgButton
            onClick={handleNextClick}
            innerText={isSubmitting ? '저장 중...' : '다음 →'}
            className="w-24 h-10"
            disabled={isSubmitting}
            textClassName="text-[15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoInputPage;
