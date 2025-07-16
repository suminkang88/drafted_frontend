import React from 'react';

interface BlackBgButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BlackBgButton: React.FC<BlackBgButtonProps> = ({
  onClick = () => {},
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
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
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-300 
        focus:ring-opacity-50
        ${className}
      `}
    >
      <span
        className="
        text-center 
        text-white 
        text-xl 
        font-normal 
        font-noto-sans
      "
      >
        다른 활동 찾아보기
      </span>
    </button>
  );
};
