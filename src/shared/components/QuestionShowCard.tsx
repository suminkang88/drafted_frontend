import React from 'react';

interface QuestionShowCardProps {
  question: string;
  maximumTextLength?: number | string;
}

const QuestionShowCard: React.FC<QuestionShowCardProps> = ({ question, maximumTextLength }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-[10px] border border-[#9B9DA1]/50 px-[27px] py-[14px] flex justify-between">
      <p className="text-[#00193E] font-noto font-semibold text-[18px]">{question}</p>
      <div className="w-fit min-w-[50px] font-noto text-base font-medium text-[#9b9da0] text-[15px] text-right">
        {maximumTextLength}자
      </div>
    </div>
  );
};

export default QuestionShowCard;
