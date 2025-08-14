import React, { useEffect, useState } from 'react';
import InfoInputCard from '@/shared/components/InfoInputCard';
import BlackBgButton from '@/shared/components/BlackBgButton';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useUserApi } from '@/features/auth/api/userApi';

const AdditionalInfoPage = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { createUser } = useUserApi();
  const [isChecking, setIsChecking] = useState(true);

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

  // 소셜 로그인 직후: 이미 추가정보가 있는 경우 이 페이지를 보여주지 않음
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      navigate('/');
      return;
    }

    // 최초 1회 추가정보 입력 로직
    const hasAdditionalInfo = (user.unsafeMetadata as any)?.hasAdditionalInfo;
    if (hasAdditionalInfo) {
      navigate('/archive');
      return;
    }

    setIsChecking(false);
  }, [isLoaded, user, navigate]);

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
        console.log('=== 백엔드 연동 시작 ===');
        console.log('환경변수 VITE_API_BASE_URL:', (import.meta as any).env.VITE_API_BASE_URL);

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

        // 백엔드 API 호출 활성화
        console.log('백엔드 API 호출 시작...');
        const userData = {
          name: form.name,
          university: form.school,
          major: form.major,
          graduation_year: Number(form.graduateYear),
          field_of_interest: form.interest,
        };
        console.log('전송할 데이터:', userData);

        const result = await createUser(userData);
        console.log('백엔드 API 호출 성공:', result);

        // 성공 시에만 아카이브 페이지로 이동
        alert('성공적으로 저장되었습니다!');
        navigate('/archive');
      } catch (error: any) {
        console.error('=== 백엔드 연동 오류 ===');
        console.error('추가 정보 저장 중 오류 발생:', error);

        // API 오류 응답 처리
        if (error.response) {
          const { status, data } = error.response;
          console.log('HTTP 상태 코드:', status);
          console.log('응답 데이터:', data);
          console.log('응답 헤더:', error.response.headers);

          if (status === 404) {
            // 엔드포인트를 찾을 수 없음
            alert('API 엔드포인트를 찾을 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
          } else if (status === 400) {
            // 필수 필드 누락 또는 유효성 검사 실패
            setShowError(true);
            alert(`입력 정보를 다시 확인해주세요. (${JSON.stringify(data)})`);
          } else if (status === 401) {
            // 인증 실패
            alert('인증에 실패했습니다. 다시 로그인해주세요.');
            navigate('/');
          } else if (status === 409) {
            // 이미 존재하는 사용자
            alert('이미 등록된 사용자입니다.');
            navigate('/archive');
          } else {
            // 기타 서버 오류 - 아카이브로 이동하지 않고 페이지에 머물기
            alert(`서버 오류가 발생했습니다. (${status}) ${JSON.stringify(data)}`);
          }
        } else if (error.request) {
          // 네트워크 오류 - 아카이브로 이동하지 않고 페이지에 머물기
          console.error('네트워크 오류:', error.request);
          alert('네트워크 연결을 확인해주세요.');
        } else {
          // 기타 오류 - 아카이브로 이동하지 않고 페이지에 머물기
          console.error('기타 오류:', error.message);
          alert(`오류가 발생했습니다: ${error.message}`);
        }
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setShowError(true); // 조건 불충분 시 경고 띄우기
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

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
          label="주전공"
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
          <Link to="/terms" className="text-blue-600 underline cursor-pointer">
            이용약관
          </Link>{' '}
          및{' '}
          <Link to="/privacy" className="text-blue-600 underline cursor-pointer">
            개인정보 처리방침
          </Link>
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
