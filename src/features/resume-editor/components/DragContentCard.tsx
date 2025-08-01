import React from 'react';

interface DragContentCardProps {
  content?: string;
}
const DragContentCard: React.FC<DragContentCardProps> = ({ content }) => {
  return (
    <div className="flex items-start w-full mt-[10px] rounded-[10px] border border-gray-300 bg-[#F4F7FB] px-4 py-2 text-[14px] leading-relaxed text-[#1C1C1E] shadow-sm">
      <img src="/icons/dragplane.svg" alt="icon" className="w-5 h-5 mt-[3px] mr-2" />
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default DragContentCard;
