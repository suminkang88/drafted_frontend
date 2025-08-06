import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BlackBgButtonProps {
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  innerText?: string;
}

const BlackBgButton: React.FC<BlackBgButtonProps> = ({
  onClick = () => {},
  className = '',
  textClassName = '',
  innerText = '다른 활동 찾아보기',
}) => {
  const mergedClassName = twMerge(
    `
    w-[273px] 
        h-[46px] 
        p-[5px] 
        bg-[#00193e] 
        rounded-[10px] 
        flex 
        justify-center 
        items-center 
        gap-[5px] 
        hover:bg-[#002a5c] 
        transition-colors 
        duration-200 
        `,
    className
  );
  const mergedTextClassName = twMerge(
    `
        text-center 
        text-white 
        text-xl 
        font-normal 
        font-noto`,
    textClassName
  );

  return (
    <button onClick={onClick} className={mergedClassName}>
      <span className={mergedTextClassName}>{innerText}</span>
    </button>
  );
};

export default BlackBgButton;
