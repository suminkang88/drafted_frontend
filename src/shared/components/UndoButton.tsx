import React from 'react';

interface UndoButtonProps {
  onClick?: () => void;
  bgColorClass?: string; // 배경색 커스터마이징용
}

const UndoButton: React.FC<UndoButtonProps> = ({
  onClick,
  bgColorClass = 'bg-transparent', // 기본은 투명
}) => {
  return (
    <button onClick={onClick} className={`p-2 rounded-xl ${bgColorClass}`}>
      <img src="/icons/undo.svg" alt="Undo" className="w-5 h-5" />
    </button>
  );
};

export default UndoButton;
