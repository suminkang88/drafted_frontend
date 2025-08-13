import React, { useState } from 'react';
import InfoInputCard from '@/shared/components/InfoInputCard';
import BlackBgButton from '@/shared/components/BlackBgButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const AdditionalInfoPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: '',
    school: '',
    major: '',
    graduateYear: '',
    interest: '',
    agreed: false,
  });
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 값 변경 핸들러
  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 모든 항목 입력 여부 확인
  const isFormValid =
    form.name && form.school && form.major && form.graduateYear && form.interest && form.agreed;

  // "시작하기" 클릭 시 실행
  const handleStart = async () => {
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        // Clerk 사용자 메타데이터 업데이트
        await user?.update({
          unsafeMetadata: {
            hasAdditionalInfo: true,
            additionalInfo: {
              name: form.name,
              school: form.school,
              major: form.major,
              graduateYear: form.graduateYear,
              interest: form.interest,
            },
          },
        });

        // TODO: 백엔드 연동 (필요한 경우)
        // await axios.post('/api/user/additional-info', {
        //   userId: user?.id,
        //   ...form
        // });

        // 추가 정보 입력 완료 후 아카이브 페이지로 이동
        navigate('/archive');
      } catch (error) {
        console.error('추가 정보 저장 중 오류 발생:', error);
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setShowError(true); // 조건 불충분 시 경고 띄우기
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Drafty 로고 */}
      <div className="mb-10">
        <div className="bg-[#D9D9D9] w-[300px] h-[60px] flex items-center justify-center text-[#00193E] text-base font-bold rounded">
          Drafty 로고 삽입
        </div>
      </div>

      {/* 입력 카드 */}
      <div className="bg-[#E4E8EE] w-[600px] p-8 rounded-[10px] space-y-6">
        <InfoInputCard
          label="이름"
          type="text"
          value={form.name}
          onChange={(v) => handleChange('name', v)}
          required
        />
        <InfoInputCard
          label="학교"
          type="text"
          value={form.school}
          onChange={(v) => handleChange('school', v)}
          required
        />
        <InfoInputCard
          label="전공"
          type="text"
          value={form.major}
          onChange={(v) => handleChange('major', v)}
          required
        />
        <div className="flex gap-4">
          <div className="w-1/2">
            <InfoInputCard
              label="졸업예정년도"
              type="dropdown"
              value={form.graduateYear}
              onChange={(v) => handleChange('graduateYear', v)}
              options={['2024', '2025', '2026', '2027', '2028', '2029']}
              required
            />
          </div>
        </div>
        <InfoInputCard
          label="관심분야"
          type="text"
          value={form.interest}
          onChange={(v) => handleChange('interest', v)}
          required
        />
      </div>

      {/* 약관 체크박스 */}
      <div className="flex items-center mt-6 space-x-2">
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={(e) => handleChange('agreed', e.target.checked)}
          className="w-4 h-4 border border-[#00193E]"
        />
        <p className="text-sm text-[#00193E]">
          Drafty의{' '}
          <a href="/terms" className="text-blue-600 underline cursor-pointer">
            이용약관
          </a>{' '}
          및{' '}
          <a href="/privacy" className="text-blue-600 underline cursor-pointer">
            개인정보 처리방침
          </a>
          에 동의합니다
        </p>
      </div>

      {showError && (
        <p className="text-orange-500 text-sm mt-2">
          모든 항목을 입력하고 이용약관 및 개인정보 처리방침에 동의해주세요.
        </p>
      )}

      {/* 시작하기 버튼 */}
      <div className="mt-6">
        <BlackBgButton
          onClick={handleStart}
          innerText={isSubmitting ? '저장 중...' : '시작하기'}
          className="w-[273px] h-[46px]"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AdditionalInfoPage;
