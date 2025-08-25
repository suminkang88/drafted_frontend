import React from 'react';

interface DragContentCardProps {
  content?: string;
  onClose?: () => void; // X 아이콘 클릭 시 실행할 콜백
}

const DragContentCard: React.FC<DragContentCardProps> = ({ content, onClose }) => {
  return (
    <div className="relative flex items-start w-full mt-[10px] rounded-[10px] border border-gray-300 bg-[#F4F7FB] px-4 py-2 text-[14px] leading-relaxed text-[#1C1C1E] shadow-sm">
      <img src="/icons/dragplane.svg" alt="icon" className="w-5 h-5 mt-[3px] mr-2" />
      <p className="text-sm text-gray-800 whitespace-pre-wrap flex-1">{content}</p>

      {/* X 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
};

export default DragContentCard;
