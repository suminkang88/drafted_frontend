import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GrayBgButtonProps {
  onClick?: () => void;
  className?: string;
  innerText?: string;
}

export const GrayBgButton: React.FC<GrayBgButtonProps> = ({
  onClick = () => {},
  className = '',
  innerText = '보기',
}) => {
  const mergedClassName = twMerge(
    `
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
        `,
    className
  );

  return (
    <button onClick={onClick} className={mergedClassName}>
      <div
        className="
            text-center 
            text-[#00193e] 
            text-[13px] 
            font-semibold 
            font-noto
          "
      >
        {innerText}
      </div>
    </button>
  );
};
