import React from 'react';
import { twMerge } from 'tailwind-merge';

interface GrayBgButtonProps {
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  innerText?: string;
}

const GrayBgButton: React.FC<GrayBgButtonProps> = ({
  onClick = () => {},
  className = '',
  textClassName = '',
  innerText = '보기',
}) => {
  const mergedClassName = twMerge(
    `
		w-20
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
		`,
    className
  );

  return (
    <button onClick={onClick} className={mergedClassName}>
      <div
        className={twMerge(
          `
            text-center 
            text-[#00193e] 
            text-[13px] 
            font-semibold 
            font-noto
          `,
          textClassName
        )}
      >
        {innerText}
      </div>
    </button>
  );
};

export default GrayBgButton;
