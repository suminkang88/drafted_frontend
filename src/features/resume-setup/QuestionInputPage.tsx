import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionInputCard from '@/features/resume-setup/components/QuestionInputCard';
import BlackBgButton from '@/shared/components/BlackBgButton';
import DeleteOrAdd from '@/shared/components/DeleteOrAdd';
import { useSetupApi, Question, ApplicationCreate } from '@/features/resume-setup/api/setupAPI';
import StepText from './components/StepText';

const QuestionInputPage = () => {
  const navigate = useNavigate();
  const { createApplication } = useSetupApi();

  const [questions, setQuestions] = useState([0, 1, 2, 3]); // 초기 4개 문항
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 문항 추가
  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, prev.length]);
  };

  // 문항 삭제
  const handleDeleteQuestion = () => {
    if (questions.length <= 1) {
      alert('최소 1개 이상의 지원서 문항을 작성해주세요.');
      return;
    }
    setQuestions((prev) => prev.slice(0, -1));

    // questionData에서도 마지막 항목 제거
    setQuestionData((prev) => prev.slice(0, -1));
  };

  // ✅ onLengthChange 함수 정의 - 문항 데이터 수집
  const handleLengthChange = (index: number, value: number) => {
    console.log(`문항 ${index + 1}의 글자 수 제한: ${value}`);

    // questionData 업데이트
    setQuestionData((prev) => {
      const newData = [...prev];
      if (!newData[index]) {
        newData[index] = { content: '', max_characters: value };
      } else {
        newData[index] = { ...newData[index], max_characters: value };
      }
      return newData;
    });
  };

  // 문항 내용 변경 핸들러
  const handleQuestionContentChange = (index: number, content: string) => {
    setQuestionData((prev) => {
      const newData = [...prev];
      if (!newData[index]) {
        newData[index] = { content, max_characters: 0 }; // 기본값을 0으로 설정
      } else {
        newData[index] = { ...newData[index], content };
      }
      return newData;
    });
  };

  // 다음 버튼 클릭
  const handleNext = async () => {
    // 1. 모든 표시된 문항에 대해 데이터 확인
    const validationResults = questions.map((_, index) => {
      const currentQuestionData = questionData[index];
      return {
        index: index + 1,
        hasContent: currentQuestionData?.content?.trim() || false,
        hasMaxChar: currentQuestionData?.max_characters > 0 || false,
        data: currentQuestionData,
      };
    });

    // 2. 내용이 없는 문항 확인
    const emptyContentQuestions = validationResults.filter((q) => !q.hasContent);
    if (emptyContentQuestions.length > 0) {
      alert(`문항 ${emptyContentQuestions.map((q) => q.index).join(', ')}에 내용을 입력해주세요.`);
      return;
    }

    // 3. 분량 제한이 없는 문항 확인
    const noMaxCharQuestions = validationResults.filter((q) => !q.hasMaxChar);
    if (noMaxCharQuestions.length > 0) {
      alert(
        `문항 ${noMaxCharQuestions.map((q) => q.index).join(', ')}의 분량 제한을 선택해주세요.`
      );
      return;
    }

    // 4. 유효한 데이터 추출
    const validQuestions = validationResults
      .map((q) => q.data)
      .filter((q) => q && q.content && q.max_characters > 0);

    // 5. 모든 문항이 완전히 입력되었는지 최종 확인
    if (validQuestions.length !== questions.length) {
      alert('모든 문항의 내용과 분량 제한을 입력해주세요.');
      return;
    }

    // 모든 검증을 통과한 후에만 제출 상태로 변경
    setIsSubmitting(true);
    setError('');

    try {
      console.log('=== 지원서 최종 생성 시작 ===');

      // 1. BasicInfoInputPage에서 저장된 기본 정보 가져오기
      const basicInfoData = sessionStorage.getItem('tempApplication_basicInfo');
      if (!basicInfoData) {
        alert('기본 정보를 찾을 수 없습니다. 처음부터 다시 시작해주세요.');
        navigate('/resume/basic-info');
        return;
      }

      const basicInfo = JSON.parse(basicInfoData);

      // 2. 완전한 ApplicationCreate 데이터 구성
      const completeApplicationData: ApplicationCreate = {
        activity: basicInfo.applyTo,
        category: basicInfo.category,
        endDate: basicInfo.dueDate,
        position: basicInfo.position,
        notice: basicInfo.description || undefined,
        questions: validQuestions,
      };

      console.log('백엔드로 전송할 완전한 데이터:', completeApplicationData);

      // 3. 백엔드에 최종 전송 (ActivityRecommendPage에서 사용할 데이터)
      const result = await createApplication(completeApplicationData);
      console.log('지원서 생성 성공:', result);

      // 4. 임시 데이터 정리 (백엔드에서 관리하므로)
      sessionStorage.removeItem('tempApplication_basicInfo');

      // 5. ActivityRecommendPage로 이동 (백엔드 관리 시작)
      navigate('/resume/activity-recommend');
    } catch (error: any) {
      console.error('지원서 생성 실패:', error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError('입력 정보를 다시 확인해주세요.');
        } else if (status === 401) {
          setError('인증에 실패했습니다. 다시 로그인해주세요.');
          navigate('/');
        } else {
          setError(`서버 오류가 발생했습니다. (${status})`);
        }
      } else if (error.request) {
        setError('네트워크 연결을 확인해주세요.');
      } else {
        setError(`오류가 발생했습니다: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFC] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-4xl mb-12">
        <div className="text-center mb-4">
          <StepText step={2} description="지원서 문항 입력하기" />
        </div>
        <div className="flex justify-end">
          <DeleteOrAdd onAddClick={handleAddQuestion} onDeleteClick={handleDeleteQuestion} />
        </div>
      </div>

      <div
        className={`w-full max-w-4xl transition-all duration-300 ${
          questions.length > 4 ? 'max-h-[70vh] overflow-y-auto' : ''
        }`}
      >
        {questions.map((q, index) => (
          <div key={q} className="mb-10">
            <QuestionInputCard
              index={index}
              onLengthChange={handleLengthChange}
              onContentChange={(content) => handleQuestionContentChange(index, content)}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 다음 버튼 */}
      <div className="flex justify-center mt-8">
        <BlackBgButton
          onClick={handleNext}
          innerText={isSubmitting ? '저장 중...' : '다음 →'}
          className="w-24 h-10"
          disabled={isSubmitting}
          textClassName="text-[15px]"
        />
      </div>
    </div>
  );
};

export default QuestionInputPage;
