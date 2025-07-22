import { useState, useEffect } from 'react';
import React from 'react';
import { BlackBgButton, GrayBgButton } from '@/shared/components';

interface QuestionSelectButtonProps {
  questionNumbers: number;
  selectedTab?: number;
  onClick?: (tabNumber: number) => void;
  className?: string;
}

const QuestionSelectButton: React.FC<QuestionSelectButtonProps> = ({
  questionNumbers,
  className = '',
}) => {
  const tabs = [...Array(questionNumbers)].map((_, i) => i);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const buttonStyleClass = `
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
                 `;

  return (
    <div className={`bg-white p-4 ${className}`}>
      <div className="h-7 justify-start items-center gap-[15px] inline-flex">
        {tabs.map((tabNumber) => {
          const isActive = tabNumber === selectedTab;
          return isActive ? (
            <BlackBgButton
              key={tabNumber}
              className={buttonStyleClass}
              onClick={() => setSelectedTab(tabNumber)}
              textClassName="
                    text-center 
                    text-[13px] 
                    font-semibold 
                    font-noto"
              innerText={`문항 ${tabNumber + 1}`}
            />
          ) : (
            <GrayBgButton
              key={tabNumber}
              className={buttonStyleClass}
              onClick={() => setSelectedTab(tabNumber)}
              textClassName="
                    text-center 
                    text-[13px] 
                    font-semibold 
                    font-noto"
              innerText={`문항 ${tabNumber + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionSelectButton;
