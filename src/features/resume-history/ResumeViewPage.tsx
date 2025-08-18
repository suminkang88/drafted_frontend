import { useParams, useNavigate } from 'react-router-dom';
import { GrayBgButton, QuestionShowCard } from '@/shared/components';

interface Question {
  id: number;
  prompt: string;
  content?: string;
  characterCount?: number;
  maxCharacters?: number;
}

interface ApplicationFormProps {
  title?: string;
  questions?: Question[];
  onEditQuestions?: () => void;
  onQuestionChange?: (questionId: number, content: string) => void;
}

const defaultQuestions: Question[] = [
  {
    id: 1,
    prompt: '멋쟁이사자처럼 13기에 지원한 동기를 적어주세요.',
    content: 'resume/editor 기준 가장 마지막으로 보드에 저장된 지원서 내역 띄우기',
    characterCount: 153,
    maxCharacters: 700,
  },
  {
    id: 2,
    prompt: '멋쟁이사자처럼 13기에 지원한 동기를 적어주세요.',
    content: 'resume/editor 기준 가장 마지막으로 보드에 저장된 지원서 내역 띄우기',
    characterCount: 153,
    maxCharacters: 700,
  },
  {
    id: 4,
    prompt:
      '멋쟁이사자처럼에서는 여러분이 직접 기획한 여러 프로젝트를 진행하게 됩니다. 이를 고려하여, 자신이 만들고 싶은 프로젝트를 제안해주세요.',
    content: 'resume/editor 기준 가장 마지막으로 보드에 저장된 지원서 내역 띄우기',
    characterCount: 153,
    maxCharacters: 700,
  },
];

export default function ApplicationForm({
  title = '멋쟁이 사자처럼 13기 지원서',
  questions = defaultQuestions,
  onEditQuestions = () => {},
  onQuestionChange = () => {},
}: ApplicationFormProps) {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <div className="m-32 mt-16 max-w-[1215px] mx-auto">
        {/* Title */}
        <div className="mb-[162px]">
          <h1 className="text-[#00193e] text-[42px] font-extrabold font-noto">{title}</h1>
        </div>

        {/* Edit Questions Button */}
        <div className="flex justify-end mb-[53px]">
          <GrayBgButton
            className="w-[150px] h-[40px]"
            textClassName="text-[15px]"
            onClick={() => navigate(`/resume/editor`)}
            innerText="문항 수정하기"
          />
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-[50px]">
          {questions.map((question) => (
            <div key={question.id} className="flex flex-col gap-[11px]">
              {/* Question Title */}
              <div className="w-[284px] p-[5px]">
                <h2 className="text-[#00193e] text-[22px] font-extrabold font-noto">
                  문항 {question.id}
                </h2>
              </div>

              {/* Question Prompt */}
              <QuestionShowCard question={question.prompt} />

              {/* Answer Area */}
              <div className="w-full h-[269px] relative">
                <textarea
                  className="w-full h-full pl-11 pr-[44px] pt-[14px] pb-[14px] bg-white rounded-[10px] border border-[#9b9da0] resize-none text-black text-lg font-normal font-noto leading-[30px] focus:outline-none focus:ring-2 focus:ring-[#00193e] focus:border-transparent"
                  placeholder={question.content}
                  onChange={(e) => onQuestionChange(question.id, e.target.value)}
                />

                {/* Character Counter */}
                <div className="absolute bottom-[39px] right-[18px]">
                  <span className="text-center text-[#9b9da0] text-sm font-semibold font-noto">
                    {question.characterCount} / {question.maxCharacters}
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
