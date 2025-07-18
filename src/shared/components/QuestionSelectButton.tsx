import React from 'react';
import { BlackBgButton } from './BlackBgButton';
import { GrayBgButton } from './GrayBgButton';

interface QuestionSelectButtonProps {
  questionNumbers: number;
  selectedTab?: number;
  onClick?: (tabNumber: number) => void;
  className?: string;
}

export const QuestionSelectButton: React.FC<QuestionSelectButtonProps> = ({
  questionNumbers,
  selectedTab = 0,
  onClick = () => {},
  className = '',
}) => {
  const tabs = [...Array(questionNumbers)].map((_, i) => i);

  return (
    <>
      <div className={`bg-white p-4 ${className}`}>
        <div className="h-7 justify-start items-center gap-[15px] inline-flex">
          {tabs.map((tabNumber) => {
            const isActive = tabNumber === selectedTab;

            return (
              <button
                key={tabNumber}
                onClick={() => onClick(tabNumber)}
                className={`
								w-20
                h-7 
                p-[5px] 
                rounded-[10px] 
                justify-center 
                items-center 
                gap-[5px] 
                flex 
                transition-colors 
                duration-200 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-300 
                focus:ring-opacity-50
                ${isActive ? 'bg-[#00193e] hover:bg-[#001a3f]' : 'bg-[#e4e8ee] hover:bg-[#d4d8de]'}
              `}
                aria-label={`문항 ${tabNumber} - Question ${tabNumber}`}
                aria-pressed={isActive}
                role="tab"
              >
                <div
                  className={`
                  text-center 
                  text-[13px] 
                  font-semibold 
                  font-noto-sans
                  ${isActive ? 'text-white' : 'text-[#00193e]'}
                `}
                >
                  문항 {tabNumber + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
