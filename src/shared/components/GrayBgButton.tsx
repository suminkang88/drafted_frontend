import React from 'react';

interface GrayBgButtonProps {
  onClick?: () => void;
  className?: string;
}

export const GrayBgButton: React.FC<GrayBgButtonProps> = ({
  onClick = () => {},
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
          w-[77px] 
          h-7 
          p-[5px] 
          bg-[#e4e8ee] 
          rounded-[10px] 
          justify-center 
          items-center 
          gap-[5px] 
          inline-flex 
          hover:bg-[#d4d8de] 
          transition-colors 
          duration-200 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-300 
          focus:ring-opacity-50
          ${className}
        `}
      aria-label="보기 - View"
    >
      <div
        className="
            text-center 
            text-[#00193e] 
            text-[13px] 
            font-semibold 
            font-noto-sans
          "
      >
        보기
      </div>
    </button>
  );
};
