import React from 'react';

interface AIResponseCardProps {
  content: string;
}

const AIResponseCard: React.FC<AIResponseCardProps> = ({ content }) => {
  return (
    <div className="w-full max-w-[554px] bg-white rounded-[10px] px-5 py-5 mx-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <p className="text-[#00193E] font-['Noto_Sans_Display'] font-regular text-[16px] leading-[26px] whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};

export default AIResponseCard;
