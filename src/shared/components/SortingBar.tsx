import { useState } from 'react';

interface SortingBarProps {
  selected: string;
  onSelect: (value: string) => void;
  options: string[];
}

const SortingBar: React.FC<SortingBarProps> = ({ selected, onSelect, options }) => {
  return (
    <div className="flex space-x-4 font-noto font-medium text-[16px]">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`transition-colors ${selected === option ? 'text-#00193E ' : 'text-gray-400'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SortingBar;
