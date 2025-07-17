import React from 'react';

interface QuestionShowCardProps {
  question: string;
}

const QuestionShowCard: React.FC<QuestionShowCardProps> = ({ question }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[10px] border border-[#9B9DA1]/50 px-[27px] py-[14px]">
      <p className="text-[#00193E] font-semibold font-['Noto_Sans_Display'] text-[18px]">
        {question}
      </p>
    </div>
  );
};

export default QuestionShowCard;
