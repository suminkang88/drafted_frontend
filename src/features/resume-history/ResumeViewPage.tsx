import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GrayBgButton, QuestionShowCard } from '@/shared/components';
import { useSetupApi } from '../resume-setup/api/setupAPI';
import { useState, useEffect } from 'react';
import { Application } from '@/app/types';

interface Question {
  questionId: number;
  questionOrder: number;
  content: string;
  answer?: string;
  characterCount?: number;
  limit?: number;
}

interface ApplicationFormProps {
  title?: string;
  category?: string;
  deadline?: string;
  questions?: Question[];
  resumeId?: string;
  onEditQuestions?: () => void;
  onQuestionChange?: (questionId: number, content: string) => void;
}

const ResumeViewPage = () => {
  const { id: resumeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchApplication } = useSetupApi();
  // const [applicationData, setApplicationData] = useState<Application>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // location.state에서 지원서 제목 전달받음
  const passedData = location.state as {
    title?: string;
    category?: string;
    deadline?: string;
  } | null;

  useEffect(() => {
    const loadApplicationQuestions = async () => {
      console.log('loadApplicationQuestions 함수 시작');

      if (!resumeId) {
        console.log('❌ resumeId가 없음, 함수 종료');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchApplication(resumeId);
        console.log('받아온 전체 applicationData:', result);
        setQuestions(result);
      } catch (err) {
        console.error('지원서 문항 로딩 실패:', err);
        setError('지원서 문항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadApplicationQuestions();
  }, [resumeId, passedData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-[20px] font-noto font-medium">지원서 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="m-10">
      <ApplicationForm
        title={passedData?.title}
        category={passedData?.category}
        deadline={passedData?.deadline}
        questions={questions}
        resumeId={resumeId}
      />
    </div>
  );
};

export default ResumeViewPage;

function ApplicationForm({ title, category, deadline, questions, resumeId }: ApplicationFormProps) {
  const navigate = useNavigate();
  const onEditQuestions = () => {};

  return (
    <div>
      <div className="m-32 mt-16 max-w-[1215px] mx-auto">
        {/* Title */}
        <div className="mb-[120px] flex flex-col gap-5">
          <h1 className="text-[#00193e] text-[42px] font-extrabold font-noto">{title}</h1>
          <div className="flex gap-5">
            <span className="text-[#00193e] text-[18px] font-noto font-semibold">{category}</span>
            <span className="text-[#00193e]">∙</span>
            <span className="text-[#00193e] text-[18px] font-noto font-semibold">
              {deadline}까지
            </span>
          </div>
        </div>

        {/* Edit Questions Button */}
        <div className="flex justify-end mb-[53px]">
          <GrayBgButton
            className="w-[150px] h-[40px]"
            textClassName="text-[15px]"
            onClick={() => navigate(`/resume/${resumeId}/editor`)}
            innerText="문항 수정하기"
          />
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-[50px]">
          {questions?.map((question) => (
            <div key={question.questionOrder} className="flex flex-col gap-[11px]">
              {/* Question Title */}
              <div className="w-[284px] p-[5px]">
                <h2 className="text-[#00193e] text-[22px] font-extrabold font-noto">
                  문항 {question.questionOrder}
                </h2>
              </div>

              {/* Question Prompt */}
              <QuestionShowCard question={question.content} maximumTextLength={question.limit} />

              {/* Answer Area */}
              <div className="w-full h-[269px] relative">
                <textarea
                  className="w-full h-full pl-11 pr-[44px] pt-[14px] pb-[14px] bg-white rounded-[10px] border border-[#9b9da0] resize-none text-black text-lg font-normal font-noto leading-[30px] focus:outline-none focus:ring-2 focus:ring-[#00193e] focus:border-transparent"
                  placeholder={question.content}
                  value={question.answer}
                  readOnly={true}
                />

                {/* Character Counter */}
                <div className="absolute bottom-[39px] right-[18px]">
                  <span className="text-center text-[#9b9da0] text-sm font-semibold font-noto">
                    {question.answer?.length} / {question.limit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
